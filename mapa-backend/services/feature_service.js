const FeatureRepository = require("../repositories/feature_repository");

class FeatureService {
  constructor() {
    this.featureRepository = new FeatureRepository();
  }

  async createFeature(data) {
    const feature = await this.featureRepository.createFeature(data);
    return feature;
  }

  async editFeature(data) {
    const newFeature = await this.featureRepository.editFeature(data);
    return newFeature;
  }

  async getFeature() {
    const features = await this.featureRepository.getFeature();
    return features;
  }

  async deleteFeature(id) {
    const feature = await this.featureRepository.deleteFeature(id);
    return feature;
  }
}

module.exports = FeatureService;
