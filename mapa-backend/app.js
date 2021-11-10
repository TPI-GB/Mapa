const express = require("express");
const cors = require("cors");
const app = express();
const UserController = require("./controllers/user_controller");
const PlaceController = require("./controllers/place_controller");

app.use(cors());

var bodyParser = require("body-parser");

app.use(bodyParser.json()); // body en formato json
app.use(bodyParser.urlencoded({ extended: false })); //body formulario

let userController = new UserController();
let placeController = new PlaceController();

app.use("/users", userController.router);
app.use("/places", placeController.router);

module.exports = app;
