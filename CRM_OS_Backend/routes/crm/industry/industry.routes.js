const express = require("express");
const industryRoutes = express.Router();
const {
  createIndustry,
  getAllIndustry,
  getSingleIndustry,
  updateIndustry,
  deleteIndustry,
} = require("./industry.controller");

industryRoutes.post("/", createIndustry);
industryRoutes.get("/", getAllIndustry);
industryRoutes.get("/:id", getSingleIndustry);
industryRoutes.put("/:id", updateIndustry);
industryRoutes.delete("/:id", deleteIndustry);

module.exports = industryRoutes;
