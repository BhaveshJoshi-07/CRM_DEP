const express = require("express");
const ticketCommentRoutes = express.Router();
const {
  createTicketComment,
  getAllTicketComment,
} = require("./ticketComment.controller");
const authorize = require("../../../utils/authorize");
ticketCommentRoutes.post("/", authorize("create-ticket"), createTicketComment);
ticketCommentRoutes.get("/", getAllTicketComment);

module.exports = ticketCommentRoutes;
