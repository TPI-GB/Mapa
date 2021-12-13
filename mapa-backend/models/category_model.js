const mongoose = require("mongoose");
const { appConfig } = require("../config");
const Schema = mongoose.Schema;

const CategorySchema = Schema(
  {
    name: { type: String, unique: true },
    icon: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Categories", CategorySchema);
