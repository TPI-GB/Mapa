const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");
const UserController = require("./controllers/user_controller");
const PlaceController = require("./controllers/place_controller");
const CategoryController = require("./controllers/category_controller");
const FeatureController = require("./controllers/feature_controller");
const CommentController = require("./controllers/comment_controller");
const multer = require("multer");

//const upload = require("./libs/storage");

app.use(cors());

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(multer().array());

let userController = new UserController();
let placeController = new PlaceController();
let categoryController = new CategoryController();
let featureController = new FeatureController();
let commentController = new CommentController();

app.use("/users", userController.router);
app.use("/places", placeController.router);
app.use("/categories", categoryController.router);
app.use("/features", featureController.router);
app.use("/comment", commentController.router);
//app.use("/public", express.static(`${__dirname}/storage/imgs`));

module.exports = app;
