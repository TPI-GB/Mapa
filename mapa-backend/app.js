const express = require("express");
const cors = require("cors");
const app = express();
const UserController = require("./controllers/user_controller");

app.use(cors());

var bodyParser = require("body-parser");

app.use(bodyParser.json()); // body en formato json
app.use(bodyParser.urlencoded({ extended: false })); //body formulario

let userController = new UserController();

app.use("/users", userController.router);

module.exports = app;
