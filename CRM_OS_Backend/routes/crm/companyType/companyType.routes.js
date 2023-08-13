const express = require("express");
const companyTypeRoutes = express.Router();
const {
  createCompanyType,
  getAllCompanyType,
  getSingleCompanyType,
  updateCompanyType,
  deleteCompanyType,
} = require("./companyType.controller");

companyTypeRoutes.post("/", createCompanyType);
companyTypeRoutes.get("/", getAllCompanyType);
companyTypeRoutes.get("/:id", getSingleCompanyType);
companyTypeRoutes.put("/:id", updateCompanyType);
companyTypeRoutes.delete("/:id", deleteCompanyType);

module.exports = companyTypeRoutes;
