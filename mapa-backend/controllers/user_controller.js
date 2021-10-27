const express = require("express");
const {
  registerUser,
  getUsers,
  editUser,
  reset,
  login,
} = require("../services/user_services");
const api = express.Router();

api.post("/", registerUser);
api.get("/", getUsers);
api.put("/", reset);
api.post("/edit", editUser);
api.post("/login", login);

module.exports = api;
