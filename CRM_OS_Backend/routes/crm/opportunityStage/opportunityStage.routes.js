const express = require("express");
const opportunityStageRoutes = express.Router();
const {
  createOpportunityStage,
  getAllOpportunityStage,
  getSingleOpportunityStage,
  updateOpportunityStage,
  deleteOpportunityStage,
} = require("./opportunityStage.controller");

opportunityStageRoutes.post("/", createOpportunityStage);
opportunityStageRoutes.get("/", getAllOpportunityStage);
opportunityStageRoutes.get("/:id", getSingleOpportunityStage);
opportunityStageRoutes.put("/:id", updateOpportunityStage);
opportunityStageRoutes.delete("/:id", deleteOpportunityStage);

module.exports = opportunityStageRoutes;
