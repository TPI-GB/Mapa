const express = require("express");
const { registerUser, getUsers } = require("../controllers/userController");
const api = express.Router();

api.post("/", registerUser);
api.get("/", getUsers);

module.exports = api;
