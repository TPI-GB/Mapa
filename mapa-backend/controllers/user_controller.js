const express = require("express");
const UserService = require("../services/user_service");

class UserController {
  constructor() {
    this.userService = new UserService();
    this.router = express.Router();
    this.router.get("/", (req, res) => {
      this.getUsers(req, res);
    });
    this.router.post("/", (req, res) => {
      this.registerUser(req, res);
    });
    this.router.put("/", reset);
    this.router.post("/edit", editUser);
    this.router.post("/login", login);
  }

  getUsers(req, res) {
    const usersPromise = this.userService.getUsers();
    usersPromise
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  registerUser(req, res) {
    const data = req.body;
    const userPromise = this.userService.registerUser(data);
    userPromise
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  // FALTA RESET, EDIT, LOGIN.
}

module.exports = UserController;
