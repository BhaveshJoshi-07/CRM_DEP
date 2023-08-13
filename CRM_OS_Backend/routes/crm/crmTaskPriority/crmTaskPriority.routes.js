const express = require("express");
const crmTaskPriorityRoutes = express.Router();
const {
  createCrmTaskPriority,
  getAllCrmTaskPriority,
  getSingleCrmTaskPriority,
  updateCrmTaskPriority,
  deleteCrmTaskPriority,
} = require("./crmTaskPriority.controller");

crmTaskPriorityRoutes.post("/", createCrmTaskPriority);
crmTaskPriorityRoutes.get("/", getAllCrmTaskPriority);
crmTaskPriorityRoutes.get("/:id", getSingleCrmTaskPriority);
crmTaskPriorityRoutes.put("/:id", updateCrmTaskPriority);
crmTaskPriorityRoutes.delete("/:id", deleteCrmTaskPriority);

module.exports = crmTaskPriorityRoutes;
