const express = require("express");
const quoteStageRoutes = express.Router();
const {
  createQuoteStage,
  getAllQuoteStages,
  getSingleQuoteStage,
  updateQuoteStage,
  deleteQuoteStage,
} = require("./quoteStage.controller");

quoteStageRoutes.post("/", createQuoteStage);
quoteStageRoutes.get("/", getAllQuoteStages);
quoteStageRoutes.get("/:id", getSingleQuoteStage);
quoteStageRoutes.put("/:id", updateQuoteStage);
quoteStageRoutes.delete("/:id", deleteQuoteStage);

module.exports = quoteStageRoutes;
