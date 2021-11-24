const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserRepository {
  //Register
  async registerUser(data) {
    const {
      first_name,
      last_name,
      nick,
      rol,
      password,
      email,
      active,
      hasChangePassword,
    } = data;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      nick,
      rol,
      password: encryptedPassword,
      email: email.toLowerCase(),
      active,
      hasChangePassword,
    });

    return await user.save();
  }

  //GetUsers
  async getUsers() {
    return await User.find().lean().exec();
  }

  async userEmail(email) {
    return await User.findOne({ email, active: true });
    //Ver porque no anda con active: false
  }

  //EditUser
  async editUser(data) {
    const { first_name, last_name, nick, rol, email, id } = data;

    let newData = {};

    if (first_name != "") {
      newData.first_name = first_name;
    }
    if (last_name != "") {
      newData.last_name = last_name;
    }
    if (nick != "") {
      newData.nick = nick;
    }
    if (email != "") {
      newData.email = email;
    }

    newData.rol = rol;

    await User.findByIdAndUpdate({ _id: id }, newData);

    const userStored = await User.findById(id);

    return userStored;
  }

  async editUserStatus(data) {
    const { active, id } = data;

    const newData = {
      active: active,
      id: id,
    };

    await User.findByIdAndUpdate({ _id: id }, newData);

    const userStored = await User.findById(id);

    return userStored;
  }
}

module.exports = UserRepository;
