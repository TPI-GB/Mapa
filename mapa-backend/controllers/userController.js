const Users = require("./model/users");
const bcrypt = require("bcryptjs");

async function registerUser (req, res) {
    try {
      const { first_name, last_name, email, password, ID, ID_Type, nick } =
        req.body;
  
      if (
        !(email && password && first_name && last_name && nick && ID && ID_Type)
      ) {
        res.status(400).send("All input is required");
      }
  
      const oldUser = await Users.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      encryptedPassword = await bcrypt.hash(password, 10);
  
      const user = await Users.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        nick,
        roles: [],
        ID,
        ID_Type,
        mustChangePassword: false,
        active: true,
      });
  
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  }
  
  module.exports = {
    registerUser
  }