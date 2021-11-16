const mongoose = require("mongoose");
const { appConfig } = require("../config");
const Schema = mongoose.Schema;

const PlaceSchema = Schema(
  {
    name: String,
    address: { type: String, unique: true },
    lactitude: String,
    longitude: String,
    categories: [],
    sub_categories: [],
    //features: { type: Array, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

//PlaceSchema.index({ address: 1 }, { unique: true });
module.exports = mongoose.model("Places", PlaceSchema);
