const express = require("express");
const {
  registerUser,
  getUsers,
  editUser,
} = require("../controllers/userController");
const api = express.Router();

api.post("/", registerUser);
api.get("/", getUsers);
api.post("/edit", editUser);

module.exports = api;
