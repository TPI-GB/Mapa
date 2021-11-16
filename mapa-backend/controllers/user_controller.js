const express = require("express");
const UserService = require("../services/user_service");
const auth = require("../middleware/auth");

class UserController {
  constructor() {
    this.userService = new UserService();
    this.router = express.Router();
    this.router.get("/", auth, (req, res) => this.getUsers(req, res));
    this.router.post("/", (req, res) => this.registerUser(req, res));
    this.router.put("/password", auth, (req, res) => this.reset(req, res));
    this.router.put("/:id", auth, (req, res) => this.editUser(req, res));
    this.router.put("/:id/status", auth, (req, res) =>
      this.editUserStatus(req, res)
    );
    this.router.post("/login", (req, res) => this.login(req, res));
  }

  //Agregar auth despues de terminar el login.

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

  reset(req, res) {
    let email;

    if (!email) {
      res.status(400).send("All input is required");
    }

    const userPromise = this.userService.reset(email);
    userPromise
      .then((email) => {
        if (email) {
          return res.status(200).json(email);
        }
        res.json(email);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  editUser(req, res) {
    const data = req.body;
    const { id } = req.params;
    console.log(id);
    data.id = id;
    const userPromise = this.userService.editUser(data);
    userPromise
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }

  editUserStatus(req, res) {
    const data = req.body;
    const { id } = req.params;
    data.id = id;
    const userPromise = this.userService.editUserStatus(data);
    userPromise
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }

  login(req, res) {
    const data = req.body;
    if (!(data.email && data.password)) {
      res.status(400).send("All input is required");
    }

    const userPromise = this.userService.login(data.email, data.password);
    userPromise
      .then((user) => {
        if (user) {
          return res.status(200).json(user);
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
}

module.exports = UserController;
