const mongoose = require("mongoose");
const { appConfig } = require("../config");

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    first_name: String,
    last_name: String,
    nick: { type: String },
    rol: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    codeReset: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", UserSchema);
