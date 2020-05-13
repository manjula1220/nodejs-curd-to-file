const fs = require("fs");
const dbname = "./db.txt";

function writeToEmployeeFile(employee, cb) {
  getData((err, empData) => {
    if (empData) {
      let empObj = empData.find((emp) => emp.empEmail == employee.empEmail);
      if (empObj) {
        let returnObj = { success: "false", msg: "user already exist" };
        return cb(returnObj);
      }
      employee.id = empData.length + 1;
      empData.push(employee);
    } else {
      empData = [];
      employee.id = 1;
      empData.push(employee);
    }
    writeData(empData, (err, success) => {
      if (err) {
        let returnObj = { success: "false", msg: err.message };
        return cb(returnObj);
      } else {
        let returnObj = { success: true, msg: `empId ${employee.id}` };
        return cb(null, returnObj);
      }
    });
  });
}

function getEmployeeFromFile(empReadCB) {
  getData((error, success) => {
    if (error) {
      let readObj = { success: false, msg: error };
      return empReadCB(readObj);
    } else {
      let readObj = { success: true, msg: success };
      return empReadCB(null, readObj);
    }
  });
}

function deleteObjectEmpFromFile(id, deleteCb) {
  getData((err, empdata) => {
    let empIndex = empdata.findIndex((emp) => emp.id == id);
    if (empIndex == -1) {
      let deleteObj = { success: false, msg: "Employee not found" };
      return deleteCb(deleteObj);
    }
    empdata.splice(empIndex, 1);
    writeData(empdata, (err, success) => {
      if (err) {
        let deleteObj = { success: false, msg: err };
        return deleteCb(deleteObj);
      } else {
        let deleteObj = { success: true, msg: "deleted successfully" };
        return deleteCb(null, deleteObj);
      }
    });
  });
}

function updateEmployeeToFile(empId, reqbody, updateCB) {
  getData((err, empData) => {
    let employeeObj = empData.find((emp) => emp.id == empId);
    if (!employeeObj) {
      let updateObj = { success: false, msg: "Employee not found" };
      return updateCB(updateObj);
    }
    for (const key in reqbody) {
      employeeObj[key] = reqbody[key];
    }
    writeData(empData, (err, success) => {
      if (err) {
        let updateObj = { success: false, msg: err.message };
        return updateCB(updateObj);
      } else {
        let updateObj = { success: true, msg: "updated successfully" };
        return updateCB(null, updateObj);
      }
    });
  });
}

function getData(cb) {
  let readStream = fs.createReadStream(dbname);
  let empData = "";
  readStream.on("data", (edata) => {
    empData += edata;
  });
  readStream.on("close", () => {
    empData = JSON.parse(empData);
    return cb(null, empData);
  });
  readStream.on("error", (error) => {
    return cb(error.message);
  });
}

function writeData(empData, cb) {
  let writeStream = fs.createWriteStream(dbname);
  writeStream.write(JSON.stringify(empData), (err) => {
    if (err) {
      return cb(err.message);
    } else {
      return cb(null, true);
    }
  });
}

module.exports = {
  writeToEmployeeFile,
  getEmployeeFromFile,
  deleteObjectEmpFromFile,
  updateEmployeeToFile,
};
