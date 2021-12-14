const mongoose = require("mongoose");
const { appConfig } = require("../config");
const Schema = mongoose.Schema;

const PlaceSchema = Schema(
  {
    name: String,
    address: { type: String, unique: true },
    lactitude: Number,
    longitude: Number,
    image: String,
    category: String,
    features: [],
    description: String,
    votes_count: { type: Number, default: 0.0 },
    rating: { type: Number, default: 0.0 },
    comments: [],
  },
  {
    timestamps: true,
  }
);

PlaceSchema.method.setImgUrl = function setImgUrl(filename) {
  const { host, port } = appConfig;
  this.imgUrl = `${host}:${port}/public/${filename}`;
};

//PlaceSchema.index({ address: 1 }, { unique: true });
module.exports = mongoose.model("Places", PlaceSchema);
