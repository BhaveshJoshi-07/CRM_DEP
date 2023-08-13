const express = require("express");
const crmTaskStatusRoutes = express.Router();
const {
  createCrmTaskStatus,
  getAllCrmTaskStatus,
  getSingleCrmTaskStatus,
  updateCrmTaskStatus,
  deleteCrmTaskStatus,
} = require("./crmTaskStatus.controller");

crmTaskStatusRoutes.post("/", createCrmTaskStatus);
crmTaskStatusRoutes.get("/", getAllCrmTaskStatus);
crmTaskStatusRoutes.get("/:id", getSingleCrmTaskStatus);
crmTaskStatusRoutes.put("/:id", updateCrmTaskStatus);
crmTaskStatusRoutes.delete("/:id", deleteCrmTaskStatus);

module.exports = crmTaskStatusRoutes;
