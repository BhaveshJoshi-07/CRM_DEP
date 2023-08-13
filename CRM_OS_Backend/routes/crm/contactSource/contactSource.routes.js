const express = require("express");
const contactSourceRoutes = express.Router();
const {
  createContactSource,
  getAllContactSource,
  getSingleContactSource,
  updateContactSource,
  deleteContactSource,
} = require("./contactSource.controller");

contactSourceRoutes.post("/", createContactSource);
contactSourceRoutes.get("/", getAllContactSource);
contactSourceRoutes.get("/:id", getSingleContactSource);
contactSourceRoutes.put("/:id", updateContactSource);
contactSourceRoutes.delete("/:id", deleteContactSource);

module.exports = contactSourceRoutes;
