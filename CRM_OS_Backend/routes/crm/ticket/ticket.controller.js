const { getPagination } = require("../../../utils/query");
const prisma = require("../../../utils/prisma");

//create ticket
const createTicket = async (req, res) => {
  try {
    //auto generate ticket id
    let ticketId = Math.floor(100000 + Math.random() * 900000);
    const ticketStatusId = 1;

    const allTicketId = await prisma.ticket.findMany({
      where: {
        ticketId: parseInt(ticketId),
      },
    });
    if (allTicketId.length > 0) {
      ticketId = Math.floor(100000 + Math.random() * 900000);
    }

    //get the user
    const customer = await prisma.customer.findUnique({
      where: {
        id: parseInt(req.body.customerId),
      },
    });

    const createTicket = await prisma.ticket.create({
      data: {
        ticketId: parseInt(ticketId),
        customer: {
          connect: {
            id: parseInt(req.body.customerId),
          },
        },
        email: req.body.email ? req.body.email : customer.email,
        subject: req.body.subject,
        description: req.body.description,
        ticketAttachment: req.files[0].filename,
        ticketResolveTime: req.body.ticketResolveTime
          ? req.body.ticketResolveTime
          : undefined,
        ticketCategory: {
          connect: {
            id: parseInt(req.body.ticketCategoryId),
          },
        },
        ticketStatus: {
          connect: {
            id: parseInt(ticketStatusId),
          },
        },
        priority: {
          connect: {
            id: parseInt(req.body.priorityId),
          },
        },
      },
    });
    return res.status(200).json(createTicket);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

//get all ticket
const getAllTicket = async (req, res) => {
  try {
    const getAllTicket = await prisma.ticket.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        ticketCategory: true,
        ticketStatus: true,
        priority: true,
      },
    });
    return res.status(200).json(getAllTicket);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get single ticket
const getSingleTicket = async (req, res) => {
  try {
    const getSingleTicket = await prisma.ticket.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        ticketComment: true,
        ticketCategory: true,
        ticketStatus: true,
        priority: true,
      },
    });
    return res.status(200).json(getSingleTicket);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update ticket
const updateTicket = async (req, res) => {
  try {
    const getSingleTicket = await prisma.ticket.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (req.body.ticketStatusId === 2) {
      const ticketResponseTime = new Date();
      const ticketResponseTimeDiff = Math.abs(
        ticketResponseTime - getSingleTicket.createdAt
      );
      const totalMinutes = Math.floor(ticketResponseTimeDiff / (1000 * 60));
      const updateTicket = await prisma.ticket.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          ticketAssignee: req.body.ticketAssigneeId
            ? {
                connect: {
                  id: parseInt(req.body.ticketAssigneeId),
                },
              }
            : undefined,
          ticketResponseTime: String(totalMinutes),
          ticketResolveTime: new Date(),
          ticketStatus: {
            connect: {
              id: parseInt(req.body.ticketStatusId),
            },
          },
        },
      });
      return res.status(200).json(updateTicket);
    }

    if (req.body.ticketStatusId === 4) {
      const resolveTime = new Date();
      const ticketResolveTimeDiff = Math.abs(
        resolveTime - new Date(getSingleTicket.ticketResolveTime)
      );
      const totalMinutes = Math.floor(ticketResolveTimeDiff / (1000 * 60));
      req.body.ticketResolveTime = String(totalMinutes);
    }

    const updateTicket = await prisma.ticket.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    return res.status(200).json(updateTicket);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

//delete ticket
const deleteTicket = async (req, res) => {
  try {
    const deleteTicket = await prisma.ticket.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    return res.status(200).json(deleteTicket);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTicket,
  getAllTicket,
  getSingleTicket,
  updateTicket,
  deleteTicket,
};
