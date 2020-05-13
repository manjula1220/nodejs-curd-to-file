const path = require("path");
const db = require("./db");
// const employees = [];

function getEmployees(req, res) {
  //return res.send(employees);
  db.getEmployeeFromFile((error, success) => {
    if (error) {
      return res.status(500).json(error);
    } else {
      return res.status(200).json(success);
    }
  });
}

function saveEmployee(req, res) {
  let employeeData = db.writeToEmployeeFile(req.body, (err, success) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(success);
    }
  });
}

function deleteEmployee(req, res) {
  console.log(req);
  const empId = req.params.id;
  db.deleteObjectEmpFromFile(empId, (err, success) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(success);
    }
  });
}

function updateEmployee(req, res) {
  let empId = req.params.id;
  db.updateEmployeeToFile(empId, req.body, (err, success) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(success);
    }
  });
}
function download(req, res) {
  //res.download(path.join(__dirname, "download.txt"), (err) => {});
  res.status(302).redirect("https://www.google.com/");
}

module.exports = {
  getEmployees,
  saveEmployee,
  updateEmployee,
  download,
  deleteEmployee,
};
