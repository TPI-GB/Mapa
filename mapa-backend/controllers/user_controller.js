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
    this.router.put("/", (req, res) => {
      this.reset(req, res);
    });
    this.router.post("/edit", (req, res) => {
      this.editUser(req, res);
    });
    this.router.post("/login", (req, res) => {
      this.login(req, res);
    });
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
    if (
      !(
        data.first_name &&
        data.last_name &&
        data.nick &&
        data.rol &&
        data.password &&
        data.email
      )
    ) {
      return res.status(400).send("All fields are required");
    }
    const userPromise = this.userService.registerUser(data);
    userPromise
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  reset(req, res) {}

  editUser(req, res) {
    const data = req.body;
    const userPromise = this.userService.editUser(data);
    userPromise
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  login(req, res) {}
}

module.exports = UserController;
