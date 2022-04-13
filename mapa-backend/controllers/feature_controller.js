const express = require("express");
const FeatureService = require("../services/feature_service");

class FeatureController {
  constructor() {
    this.featureService = new FeatureService();
    this.router = express.Router();
    this.router.post("/", (req, res) => this.createFeature(req, res));
    this.router.put("/:id", (req, res) => this.editFeature(req, res));
    this.router.get("/", (req, res) => this.getFeature(req, res));
    this.router.delete("/", (req, res) => this.deleteFeature(req, res));
  }

  createFeature(req, res) {
    const data = req.body;
    if (!data.name) {
      return res.status(400).send("The field is required");
    }
    const featurePromise = this.featureService.createFeature(data);
    featurePromise
      .then((feature) => {
        res.json(feature);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }

  editFeature(req, res) {
    const data = req.body;
    const { id } = req.params;
    data.id = id;
    const featurePromise = this.featureService.editFeature(data);
    featurePromise
      .then((feature) => {
        res.json(feature);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }

  getFeature(req, res) {
    const featurePromise = this.featureService.getFeature();
    featurePromise
      .then((feature) => {
        res.json(feature);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  deleteFeature(req, res) {
    const data = req.body;
    const { id } = data;
    const featurePromise = this.featureService.deleteFeature(id);
    featurePromise
      .then((feature) => {
        res.json(feature);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }
}

module.exports = FeatureController;
