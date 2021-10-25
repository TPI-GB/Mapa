const express = require("express");
const { reset } = require("nodemon");
const { registerUser, getUsers } = require("../controllers/userController");
const {
  registerUser,
  getUsers,
  editUser,
} = require("../controllers/userController");
const api = express.Router();

api.post("/", registerUser);
api.get("/", getUsers);
api.put("/", reset);
api.post("/edit", editUser);

module.exports = api;
