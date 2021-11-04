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
    console.log(data);
    const user = await this.userRepository.registerUser(data);
    return user;
  }

  //GetUsers
  async getUsers() {
    const users = await this.userRepository.getUsers();
    return users;
  }

  //Login
  async login(req, res) {}

  //Reset
  async reset(req, res) {}

  //EditUser
  async editUser(data) {
    const newUser = await userRepository.editUser();
    return newUser;
  }
}

module.exports = UserService;
