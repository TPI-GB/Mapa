const e = require("cors");
const User = require("../models/User");

async function registerUser(req, res) {
  try {
    const {
      first_name,
      last_name,
      nick,
      roles,
      password,
      email,
      active,
      DNI,
      DNI_Type,
    } = req.body;

    if (
      !(
        first_name &&
        last_name &&
        nick &&
        roles &&
        password &&
        email &&
        DNI &&
        DNI_Type
      )
    ) {
      return res.status(403).send("All fields are required");
    }

    const user = await User.create({
      first_name,
      last_name,
      nick,
      roles,
      password,
      email: email.toLowerCase(),
      active,
      DNI,
      DNI_Type,
      hasChangePassword,
    });

    const userStored = await user.save();

    res.status(201).send({ userStored });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

async function getUsers(req, res) {
  const usuarios = await User.find().lean().exec();
  res.status(200).send({ usuarios });
}

async function editUser(req, res) {
  try {
    const { first_name, last_name, nick, roles, email, DNI, DNI_Type } =
      req.body;

    const data = {
      first_name: first_name,
      last_name: last_name,
      nick: nick,
      roles: roles,
      email: email,
      DNI: DNI,
      DNI_Type: DNI_Type,
    };

    await User.findByIdAndUpdate({ _id: req.params.id }, data);

    const userStored = await User.findById(req.params.id);

    res.status(201).send({ userStored });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

module.exports = {
  registerUser,
  getUsers,
  editUser,
};
