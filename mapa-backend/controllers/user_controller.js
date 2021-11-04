const express = require("express");
const UserService = require("../services/user_service");
const auth = require("../middleware/auth");

class UserController {
  constructor() {
    this.userService = new UserService();
    this.router = express.Router();
    this.router.get("/", auth, (req, res) => this.getUsers(req, res));
    this.router.post("/", auth, (req, res) => this.registerUser(req, res));
    this.router.put("/", (req, res) => this.reset(req, res));
    this.router.post("/edit", auth, (req, res) => this.editUser(req, res));
    this.router.post("/login", (req, res) => this.login(req, res));
  }

  getUsers(req, res) {
    const usersPromise = this.userService.getUsers();
    usersPromise
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
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

  reset(req, res) {
    const data = req.body;

    let email;

    if (!email) {
      res.status(400).send("All input is required");
    }

    const userPromise = this.userService.reset(data);
    userPromise
      .then((user) => {
        if (user) {
          return res.status(200).json(user);
        }
        res.json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

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

  login(req, res) {
    const authHeader = req.headers.authorization;

    let email, password;
    if (authHeader) {
      const method = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      if (method && method === "Basic" && token) {
        const b = Buffer.from(token, "base64");
        const value = b.toString().split(":");
        email = value[0];
        password = value[1];
      }
    }
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const userPromise = this.userService.login(email, password);
    userPromise
      .then((user) => {
        if (user) {
          return res.status(200).json(user);
        }

        res.status(401);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
}

module.exports = UserController;
