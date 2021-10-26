const express = require("express");
const {
  registerUser,
  getUsers,
  editUser,
  reset,
} = require("../services/user_services");
const api = express.Router();

api.post("/", registerUser);
api.get("/", getUsers);
api.put("/", reset);
api.post("/edit", editUser);

module.exports = api;
