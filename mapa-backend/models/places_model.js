const mongoose = require("mongoose");
const { appConfig } = require("../config");

const Schema = mongoose.Schema;

const PlaceSchema = Schema(
  {
    name: String,
    address: String,
    lactitude: String,
    longitude: String,
    category: String,
    features: { type: Array, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

PlaceSchema.index();
module.exports = mongoose.model("Places", PlaceSchema);
