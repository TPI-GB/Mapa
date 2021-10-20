const mongoose = require("mongoose");

const users = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  ID: { type: Number },
  ID_Type: { type: String },
  nick: { type: String, unique: true },
  roles: { type: Array },
  mustChangePassword: { type: Boolean },
  active: { type: Boolean },
});

users.index({ ID: 1, ID_Type: 1 }, { unique: true });
module.exports = mongoose.model("users", users);
