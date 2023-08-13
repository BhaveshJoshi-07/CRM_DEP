const express = require("express");
const crmTaskTypeRoutes = express.Router();
const {
  createCrmTaskType,
  getAllCrmTaskType,
  getSingleCrmTaskType,
  updateCrmTaskType,
  deleteCrmTaskType,
} = require("./crmTaskType.controller");

crmTaskTypeRoutes.post("/", createCrmTaskType);
crmTaskTypeRoutes.get("/", getAllCrmTaskType);
crmTaskTypeRoutes.get("/:id", getSingleCrmTaskType);
crmTaskTypeRoutes.put("/:id", updateCrmTaskType);
crmTaskTypeRoutes.delete("/:id", deleteCrmTaskType);

module.exports = crmTaskTypeRoutes;
