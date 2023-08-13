const express = require("express");
const opportunityTypeRoutes = express.Router();
const {
  createOpportunityType,
  getAllOpportunityType,
  getSingleOpportunityType,
  updateOpportunityType,
  deleteOpportunityType,
} = require("./opportunityType.controller");

opportunityTypeRoutes.post("/", createOpportunityType);
opportunityTypeRoutes.get("/", getAllOpportunityType);
opportunityTypeRoutes.get("/:id", getSingleOpportunityType);
opportunityTypeRoutes.put("/:id", updateOpportunityType);
opportunityTypeRoutes.delete("/:id", deleteOpportunityType);

module.exports = opportunityTypeRoutes;
