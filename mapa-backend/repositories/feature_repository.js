const Feature = require("../models/feature_model");

class FeatureRepository {
  async createFeature(data) {
    const { name } = data;

    const feature = await Feature.create({
      name,
    });

    return await feature.save();
  }

  async editFeature(data) {
    const { name, id } = data;

    const newData = {};

    if (name != "") {
      newData.name = name;
    }

    await Feature.findByIdAndUpdate({ _id: id }, newData);

    const featureStored = await Feature.findById(id);

    return featureStored;
  }

  async getFeature() {
    return await Feature.find().lean().exec();
  }

  async deleteFeature(id) {
    return await Feature.deleteOne({ _id: id });
  }
}

module.exports = FeatureRepository;
