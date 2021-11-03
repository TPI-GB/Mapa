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

    if (!(first_name && last_name && nick && rol && password && email)) {
      return res.status(403).send("All fields are required");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

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
  async getUsers(req, res) {
    const users = await User.find().lean().exec();
    return users;
  }

  //Login
  async login(req, res) {
    // Our login logic starts here
    try {
      // Get user input
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
      // Validate if user exist in our database
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        // user
        return res.status(200).json({ ...user._doc, token });
      }
      return res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  }

  //Reset
  async reset(req, res) {
    try {
      const { ID } = req.params;

      encryptedPassword = await bcrypt.setRandomFallback(password, 10);

      let email, password;
      if (authHeader) {
        const method = authHeader.split(" ")[0];
        const token = bearer.split(" ")[1];
        if (method && method === "Basic" && token) {
          const b = Buffer.from(token, "base64");
          const value = b.toString().split(":");
          email = value[0];
          password = value[1];
        }
      }

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

  //EditUser
  async editUser(data) {
    const { first_name, last_name, nick, roles, email } = data;

    const newData = {
      first_name: first_name,
      last_name: last_name,
      nick: nick,
      roles: roles,
      email: email,
    };

    await User.findByIdAndUpdate({ _id: data.params.id }, newData);

    const userStored = await User.findById(data.params.id);

    return userStored;
  }
}

module.exports = UserRepository;
