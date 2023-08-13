const express = require("express");
const contactStageRoutes = express.Router();
const {
  createContactStage,
  getAllContactStage,
  getSingleContactStage,
  updateContactStage,
  deleteContactStage,
} = require("./contactStage.controller");

contactStageRoutes.post("/", createContactStage);
contactStageRoutes.get("/", getAllContactStage);
contactStageRoutes.get("/:id", getSingleContactStage);
contactStageRoutes.put("/:id", updateContactStage);
contactStageRoutes.delete("/:id", deleteContactStage);

module.exports = contactStageRoutes;
