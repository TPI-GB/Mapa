const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user_model");
const UserRepository = require("../repositories/user_repository");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  //Register
  async registerUser(data) {
    const user = await this.userRepository.registerUser(data);
    return user;
  }

  //GetUsers
  async getUsers() {
    const users = await this.userRepository.getUsers();
    return users;
  }

  //Login
  async login(email, password) {
    // Validate if user exist in our database
    try {
      const user = await this.userRepository.userEmail(email);
      if (
        user &&
        (await bcrypt.compare(password, user.password)) &&
        user.active
      ) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        let first_name = user._doc.first_name;
        let last_name = user._doc.last_name;
        let nick = user._doc.nick;
        let rol = user._doc.rol;
        let mail = user._doc.email;
        let id = user._doc._id;
        let expires = new Date(Date.now());
        expires = expires.setHours(expires.getHours() + 12);
        // user
        return {
          first_name,
          last_name,
          nick,
          rol,
          email: mail,
          token,
          expires: expires,
          id: id,
        };
      } else {
        throw new Error();
      }
    } catch (err) {
      throw new Error();
    }
    // Our register logic ends here
  }

  //Reset
  async reset(data) {
    const { email, numberSecurity } = data;

    const user = await this.userRepository.userEmail(email);
    if (user) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mapaturismogb@gmail.com",
          pass: "TurismoGB2311",
        },
      });

      const info = await transporter.sendMail({
        from: "mapaturismogb@gmail.com",
        to: email,
        subject: "Cambio de contraseña",
        text: `Su codigo de seguridad para resetear contraseña es: ${numberSecurity}`,
        html: `Su codigo de seguridad para resetear contraseña es: ${numberSecurity}`,
      });

      const newData = {
        codeReset: numberSecurity,
      };

      await User.findByIdAndUpdate({ _id: user._id }, newData);

      return info;
    }
  }

  //EditUser
  async editUser(data) {
    const newUser = await this.userRepository.editUser(data);
    return newUser;
  }

  async changePassword(data) {
    const newUser = await this.userRepository.changePassword(data);
    return newUser;
  }

  async changePasswordUser(data) {
    const newUser = await this.userRepository.changePasswordUser(data);
    return newUser;
  }

  async editUserStatus(data) {
    const editUser = await this.userRepository.editUserStatus(data);
    return editUser;
  }
}

module.exports = UserService;
