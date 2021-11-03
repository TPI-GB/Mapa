const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user_repository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  //Register
  async registerUser(data) {
    const user = await userRepository.registerUser(data);
    return user;
  }

  //GetUsers
  async getUsers(req, res) {
    const users = await userRepository.getUsers();
    return users;
  }

  //Login
  async login(req, res) {}

  //Reset
  async reset(req, res) {}

  //EditUser
  async editUser(req, res) {}
}

module.exports = UserService;
