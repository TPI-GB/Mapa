const express = require("express");
const PlaceService = require("../services/place_service");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

class PlaceController {
  constructor() {
    this.placeService = new PlaceService();
    this.router = express.Router();
    this.router.post("/", (req, res) => this.createPlace(req, res));
    this.router.put("/:id", (req, res) => this.editPlace(req, res));
    this.router.get("/", (req, res) => this.getPlace(req, res));
    this.router.delete("/", (req, res) => this.deletePlace(req, res));
    this.router.post("/img", upload.single("image"), this.createPlace);
    this.router.put("/rating/:id", (req, res) => this.editRating(req, res));
    this.router.put("/lama", (req, res) => this.lamaRating(req, res));
    this.router.put("/:rating", (req, res) => this.editRating(req, res));
    this.router.get("/filter/:place", (req, res) =>
      this.getFilterPlace(req, res)
    );
  }

  createPlace(req, res) {
    const data = req.body;

    if (
      !(
        data.name &&
        data.address &&
        data.lactitude &&
        data.longitude &&
        data.category &&
        data.features
      )
    ) {
      console.log(data.name);
      console.log(data.address);
      console.log(data.lactitude);
      console.log(data.longitude);
      console.log(data.categories);
      console.log(data.features);

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

  lamaRating(req, res) {
    const data = req.body;
    console.log("hola mundo");
  }

  editRating(req, res) {
    const data = req.body;
    const { id } = req.params;
    data.id = id;
    const placePromise = this.placeService.editRating(data);
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
    const { id } = data;
    const placePromise = this.placeService.deletePlace(id);
    placePromise
      .then((place) => {
        res.json(place);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }

  getFilterPlace(req, res) {
    const data = req.body;
    const placePromise = this.placeService.getFilterPlace(data);
    console.log(data);
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
