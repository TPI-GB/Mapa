const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const UserController = require("./controllers/user_controller");

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let userController = new UserController();

app.use("/users", userController.router);

module.exports = app;
