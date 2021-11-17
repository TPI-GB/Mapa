const mongoose = require("mongoose");
const { appConfig } = require("../config");
const Schema = mongoose.Schema;

const FeatureSchema = Schema(
  {
    name: { type: String, unique: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Features", FeatureSchema);
