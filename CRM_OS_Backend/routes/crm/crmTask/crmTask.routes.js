const express = require("express");
const crmTaskRoutes = express.Router();
const {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("./crmTask.controller");

crmTaskRoutes.post("/", createTask);
crmTaskRoutes.get("/", getAllTask);
crmTaskRoutes.get("/:id", getSingleTask);
crmTaskRoutes.put("/:id", updateTask);
crmTaskRoutes.patch("/:id", deleteTask);

module.exports = crmTaskRoutes;
