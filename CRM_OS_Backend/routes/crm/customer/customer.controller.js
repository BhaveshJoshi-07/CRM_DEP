const { getPagination } = require("../../../utils/query");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Email = require("../../../utils/email");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

//random string generator
function makePassword(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }
  return password;
}
//customer login
const customerLogin = async (req, res) => {
  try {
    const allCustomer = await prisma.customer.findMany();
    const customer = allCustomer.find(
      (c) =>
        c.email === req.body.email &&
        bcrypt.compareSync(req.body.password, c.password)
    );
    // get permission from customer roles
    const permissions = await prisma.role.findUnique({
      where: {
        id: customer.roleId,
      },
      include: {
        rolePermission: {
          include: {
            permission: true,
          },
        },
      },
    });

    const role = await prisma.role.findUnique({
      where: {
        id: customer.roleId,
      },
    });
    // store all permissions name to an array
    const permissionNames = permissions.rolePermission.map(
      (rp) => rp.permission.name
    );
    if (customer) {
      const token = jwt.sign(
        { sub: customer.id, role: role.name, permissions: permissionNames },
        secret,
        {
          expiresIn: "24h",
        }
      );
      const { password, ...customerWithoutPassword } = customer;
      return res.status(200).json({
        ...customerWithoutPassword,
        token,
      });
    }
    return res.status(400).json({ message: "Email or password is incorrect" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//reset password
const resetPassword = async (req, res) => {
  try {
    //token id and given id is match
    const accessToken = Number(req.auth.sub);
    const customer_id = Number(req.params.id);

    if (accessToken !== customer_id) {
      return res.status(200).json({ message: "you are unauthorized" });
    }
    //get the customer by id
    const customer = await prisma.customer.findUnique({
      where: {
        id: customer_id,
      },
    });
    //matching old pass
    const oldPass = bcrypt.compareSync(req.body.oldPassword, customer.password);
    //check true of false
    if (oldPass === false) {
      return res.status(200).json({ message: "Old Password not Matched" });
    }
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const updatePass = await prisma.customer.update({
      where: {
        id: customer_id,
      },
      data: {
        password: hash,
      },
    });

    if (updatePass) {
      return res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const customer = await prisma.customer.findMany({
      where: {
        email: email,
      },
    });

    if (!customer.length > 0) {
      return res.status(404).json({ message: "Email Not Found" });
    }

    //get the setting for company name
    const company = await prisma.appSetting.findUnique({
      where: {
        id: 1,
      },
    });

    //generate token
    const token = bcrypt.hashSync(email + Date.now(), 10);

    //email config
    const emailConfig = await prisma.emailConfig.findMany({
      where: {
        id: 1,
      },
    });

    //send email
    await Email.email(
      emailConfig,
      email,
      `Password Reset-${company.company_name}`,
      `<h3>Hello ${customer[0].firstName}</h3><br><h3>You recently requested a password reset for your account.Please click on the following link to reset your password ${process.env.CLIENT_URL}/reset-password?token=${token}</h3><br><h3>If you didn't initiate this request, you can safely ignore this email. Your account remains secure.</h3><br><h3>Thank you,</h3><br><h3>${company.company_name}</h3>`
    );
    return res.status(200).json({ message: "Please check your email" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//create new customer
const createSingleCustomer = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      // delete many customer at once
      const deletedAccount = await prisma.customer.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deletedAccount);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    try {
      // create single customer from an object
      const roleId = 3;
      const generatePass = makePassword(10);
      const hash = await bcrypt.hash(generatePass, saltRounds);
      console.log(hash, "hash", generatePass, "pass");
      const email = req.body.email;
      const createdCustomer = await prisma.customer.create({
        data: {
          role: {
            connect: {
              id: roleId,
            },
          },
          email: email,
          password: hash,
        },
      });

      //email config
      const emailConfig = await prisma.emailConfig.findMany({
        where: {
          id: 1,
        },
      });
      await Email.email(
        emailConfig,
        email,
        "User Info for your account",
        `<h3>Hello ${email.split("@")[0]}, Here is you login credential<br>
          Email: ${email}<br>
          Password: ${generatePass}<br>
          </h3>`
      );

      const { password, ...customerWithoutPassword } = createdCustomer;
      return res.status(201).json(customerWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//get all customer
const getAllCustomer = async (req, res) => {
  if (req.query.query === "all") {
    try {
      // get all customer
      const getAllCustomer = await prisma.customer.findMany({
        orderBy: {
          id: "desc",
        },
      });

      getAllCustomer.map((customer) => {
        customer.fullName = customer.firstName + " " + customer.lastName;
      });

      //customer without password
      const customerWithoutPassword = getAllCustomer.map((customer) => {
        const { password, ...customerWithoutPassword } = customer;
        return customerWithoutPassword;
      });

      return res.status(200).json(customerWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else if (req.query.query === "search") {
    try {
      const { skip, limit } = getPagination(req.query);
      const getAllCustomer = await prisma.customer.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          OR: [
            {
              firstName: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
          ],
        },
        skip: Number(skip),
        take: Number(limit),
      });

      getAllCustomer.map((customer) => {
        customer.fullName = customer.firstName + " " + customer.lastName;
      });

      //customer without password
      const customerWithoutPassword = getAllCustomer.map((customer) => {
        const { password, ...customerWithoutPassword } = customer;
        return customerWithoutPassword;
      });

      const totalCustomerCount = {
        _count: {
          id: getAllCustomer.length,
        },
      };

      return res
        .status(200)
        .json({ getAllCustomer: customerWithoutPassword, totalCustomerCount });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query) {
    //get the boolean status
    const boolenStatus = req.query.status?.split(",").map(JSON.parse);

    //get all company with pagination
    if (boolenStatus.length === 2) {
      try {
        const { skip, limit } = getPagination(req.query);
        const getAllCustomer = await prisma.customer.findMany({
          orderBy: {
            id: "desc",
          },
          where: {
            roleId: {
              in: req.query.role?.split(",").map(Number)
                ? req.query.role?.split(",").map(Number)
                : undefined,
            },
            OR: [
              { status: { equals: boolenStatus[0] } },
              { status: { equals: boolenStatus[1] } },
            ],
          },
          skip: Number(skip),
          take: Number(limit),
        });

        getAllCustomer.map((customer) => {
          customer.fullName = customer.firstName + " " + customer.lastName;
        });

        //customer without password
        const customerWithoutPassword = getAllCustomer.map((customer) => {
          const { password, ...customerWithoutPassword } = customer;
          return customerWithoutPassword;
        });

        const totalCustomerCount = await prisma.customer.aggregate({
          where: {
            roleId: {
              in: req.query.role?.split(",").map(Number)
                ? req.query.role?.split(",").map(Number)
                : undefined,
            },
            OR: [
              { status: { equals: boolenStatus[0] } },
              { status: { equals: boolenStatus[1] } },
            ],
          },
          _count: {
            id: true,
          },
        });

        return res.status(200).json({
          getAllCustomer: customerWithoutPassword,
          totalCustomerCount,
        });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    } else if (boolenStatus.length === 1) {
      try {
        const { skip, limit } = getPagination(req.query);
        const getAllCustomer = await prisma.customer.findMany({
          orderBy: {
            id: "desc",
          },
          where: {
            roleId: {
              in: req.query.role?.split(",").map(Number)
                ? req.query.role?.split(",").map(Number)
                : undefined,
            },
            OR: [
              { status: { equals: boolenStatus[0] } },
              { status: { equals: boolenStatus[1] } },
            ],
          },
          skip: Number(skip),
          take: Number(limit),
        });

        getAllCustomer.map((customer) => {
          customer.fullName = customer.firstName + " " + customer.lastName;
        });

        //customer without password
        const customerWithoutPassword = getAllCustomer.map((customer) => {
          const { password, ...customerWithoutPassword } = customer;
          return customerWithoutPassword;
        });

        const totalCustomerCount = await prisma.customer.aggregate({
          where: {
            roleId: {
              in: req.query.role?.split(",").map(Number)
                ? req.query.role?.split(",").map(Number)
                : undefined,
            },
            OR: [
              { status: { equals: boolenStatus[0] } },
              { status: { equals: boolenStatus[1] } },
            ],
          },
          _count: {
            id: true,
          },
        });

        return res.status(200).json({
          getAllCustomer: customerWithoutPassword,
          totalCustomerCount,
        });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }
};

//get single customer
const getSingleCustomer = async (req, res) => {
  try {
    const singleCustomer = await prisma.customer.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const { password, ...customerWithoutPassword } = singleCustomer;
    return res.status(200).json(customerWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update customer
const updateSingleCustomer = async (req, res) => {
  try {
    req.body.dateOfBirth = new Date(req.body.dateOfBirth);
    if (req.body.password) {
      delete req.body.password;
      return res.status(400).json({ message: "password can not be updated" });
    } else if (req.body.resetPassword) {
      req.body.password = await bcrypt.hash(req.body.resetPassword, 10);
    }

    const updatedCustomer = await prisma.customer.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    const { password, ...customerWithoutPassword } = updatedCustomer;
    return res.status(200).json(customerWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//delete single customer
const deleteSingleCustomer = async (req, res) => {
  try {
    const deletedCustomer = await prisma.customer.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        status: req.body.status,
      },
    });

    if (deletedCustomer) {
      return res.status(200).json({ message: "customer deleted SuccessFully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSingleCustomer,
  getAllCustomer,
  getSingleCustomer,
  updateSingleCustomer,
  deleteSingleCustomer,
  customerLogin,
  resetPassword,
  forgotPassword,
};
