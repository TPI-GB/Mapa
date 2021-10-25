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
      status,
      ID,
      ID_Type,
      hasChangePassword,
    } = req.body;

    if (
      !(
        first_name &&
        last_name &&
        nick &&
        roles &&
        password &&
        email &&
        ID &&
        ID_Type
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
      status,
      ID,
      ID_Type,
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

module.exports = {
  registerUser,
  getUsers,
};
