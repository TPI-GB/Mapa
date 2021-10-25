const mongoose = require("mongoose");
const { appConfig } = require("../config");

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    first_name: String,
    last_name: String,
    nick: { type: String, unique: true },
    roles: { type: Array, default: [] },
    password: { type: String, required: true },
    email: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    DNI: { type: Number, required: true },
    DNI_Type: { type: Number, required: true },
    hasChangePassword: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ tipodocumento: 1, numerodocumento: -1 }, { unique: true });
module.exports = mongoose.model("Users", UserSchema);
