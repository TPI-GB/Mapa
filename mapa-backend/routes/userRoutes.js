const express = require("express");
const { reset } = require("nodemon");
const { registerUser, getUsers } = require("../controllers/userController");
const api = express.Router();

api.post("/", registerUser);
api.get("/", getUsers);
api.put("/", reset);

module.exports = api;
