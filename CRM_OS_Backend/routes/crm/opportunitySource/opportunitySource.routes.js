const express = require("express");
const opportunitySourceRoutes = express.Router();
const {
  createOpportunitySource,
  getAllOpportunitySource,
  getSingleOpportunitySource,
  updateOpportunitySource,
  deleteOpportunitySource,
} = require("./opportunitySource.controller");

opportunitySourceRoutes.post("/", createOpportunitySource);
opportunitySourceRoutes.get("/", getAllOpportunitySource);
opportunitySourceRoutes.get("/:id", getSingleOpportunitySource);
opportunitySourceRoutes.put("/:id", updateOpportunitySource);
opportunitySourceRoutes.delete("/:id", deleteOpportunitySource);

module.exports = opportunitySourceRoutes;
