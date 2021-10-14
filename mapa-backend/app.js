require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();

module.exports = app;
