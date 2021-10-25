const e = require("cors");
const User = require("../models/User");
const nodemailer = require("nodemailer");

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

async function reset(req, res) {
  try {
    const { ID } = req.params;

    encryptedPassword = await bcrypt.setRandomFallback(password, 10);

    const user = await Users.findOne({ ID });

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: "enzoefica@gmail.com",
      to: user.email,
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    res.status(201).send({ info });

    res.json(req.body);
  } catch (err) {
    console.log(err);
  }
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
  reset,
  editUser,
};
