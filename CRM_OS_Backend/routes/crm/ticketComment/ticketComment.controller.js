const { getPagination } = require("../../../utils/query");
const prisma = require("../../../utils/prisma");
const { get } = require("./ticketComment.routes");

//create ticket-comment
const createTicketComment = async (req, res) => {
  try {
    const getTheCustomer = await prisma.customer.findUnique({
      where: {
        id: parseInt(req.auth.sub),
      },
    });

    const getTheUser = await prisma.user.findUnique({
      where: {
        id: parseInt(req.auth.sub),
      },
    });

    if (!getTheCustomer && !getTheUser) {
      return res.status(400).json({ message: "User not found" });
    } else if (getTheCustomer) {
      const createTicketComment = await prisma.ticketComment.create({
        data: {
          ticket: {
            connect: {
              id: parseInt(req.body.ticketId),
            },
          },
          repliedBy: getTheCustomer.firstName,
          userType: req.auth.role,
          subject: req.body.subject,
          description: req.body.description,
        },
      });

      return res.status(201).json(createTicketComment);
    } else if (getTheUser) {
      const createTicketComment = await prisma.ticketComment.create({
        data: {
          ticket: {
            connect: {
              id: parseInt(req.body.ticketId),
            },
          },
          repliedBy: getTheUser.userName,
          userType: req.auth.role,
          subject: req.body.subject,
          description: req.body.description,
        },
      });

      return res.status(201).json(createTicketComment);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

//get all ticket-comment
const getAllTicketComment = async (req, res) => {
  try {
    const getAllTicketComment = await prisma.ticketComment.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        ticket: true,
      },
    });
    return res.status(200).json(getAllTicketComment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTicketComment,
  getAllTicketComment,
};
