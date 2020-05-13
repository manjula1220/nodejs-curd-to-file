const express = require("express");
var jwt = require("jsonwebtoken");
const employRoutes = require("./employee-router");

const app = express();
const port = 3000;
app.use(express.json());

app.all("/employee/list", (req, res, next) => {
  next();
});
app.use("/employee", employRoutes);

app.get("/login", (req, res) => {
  const user = { id: 3 };
  var token = jwt.sign({ user }, "my_secret_key");
  res.json({
    token: token,
  });
});
ensureToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split("");
    req.token = bearer[1];
    next();
  } else {
    res.status(403).send({ msg: "forbidden" });
  }
};
// app.get("/list", ensureToken, employees.getEmployees);
// app.post("/save", employees.saveEmployee);
// app.put("/save/:empId", employees.updateEmployee);
app.listen(port, () => console.log(`server started on ${port}`));
