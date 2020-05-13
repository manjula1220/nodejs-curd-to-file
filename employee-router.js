const express = require("express");
const router = express.Router();

const employees = require("./employee");

router.get("/", employees.getEmployees);
router.post("/", employees.saveEmployee);
router.put("/:id", employees.updateEmployee);
router.delete("/:id", employees.deleteEmployee);
router.get("/empFile", employees.download);

module.exports = router;
