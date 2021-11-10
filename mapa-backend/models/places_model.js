const mongoose = require("mongoose");
const { appConfig } = require("../config");

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    name: String,
    address: String,
    longitud: String,
    latitud: String,
    categoria: String,
    caracteristicas: { type: [String], required: true, default: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.index();
module.exports = mongoose.model("Places", UserSchema);
