const express = require("express");
const PlaceService = require("../services/place_service");

class PlaceController {
  constructor() {
    this.placeService = new PlaceService();
    this.router = express.Router();
    this.router.post("/", (req, res) => this.createPlace(req, res));
    this.router.put("/:id", (req, res) => this.editPlace(req, res));
    this.router.get("/", (req, res) => this.getPlace(req, res));
    this.router.delete("/:id", (req, res) => this.deletePlace(req, res));
  }

  createPlace(req, res) {
    const data = req.body;
    if (
      !(
        (
          data.name &&
          data.address &&
          data.lactitude &&
          data.longitude &&
          data.category
        )
        //data.features
      )
    ) {
      return res.status(400).send("All fields are required");
    }
    const placePromise = this.placeService.createPlace(data);
    placePromise
      .then((place) => {
        res.json(place);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }

  editPlace(req, res) {
    const data = req.body;
    const { id } = req.params;
    data.id = id;
    const placePromise = this.placeService.editPlace(data);
    placePromise
      .then((place) => {
        res.json(place);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }

  getPlace(req, res) {
    const placePromise = this.placeService.getPlace();
    placePromise
      .then((place) => {
        res.json(place);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  deletePlace(req, res) {
    const data = req.body;
    const { id } = req.params;
    data.id = id;
    const placePromise = this.placeService.deletePlace(data);
    placePromise
      .then((place) => {
        res.json(place);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }
}

module.exports = PlaceController;
