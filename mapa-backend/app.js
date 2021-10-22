const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
const bodyParser = require("body-parser");

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", userRoutes);

module.exports = app;
