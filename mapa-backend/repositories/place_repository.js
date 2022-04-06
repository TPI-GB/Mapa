const Place = require("../models/places_model");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const refreshToken = process.env.REFRESH_TOKEN;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

const oauthclient2 = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri,
  refreshToken
);

oauthclient2.setCredentials({ refresh_token: refreshToken });

var drive = google.drive({ version: "v3", auth: oauthclient2 });

class PlaceRepository {
  async createPlace(data) {
    const {
      name,
      address,
      lactitude,
      longitude,
      category,
      features,
      description,
      images,
    } = data;

    try {
      const place = await Place.create({
        name,
        address,
        lactitude: lactitude,
        longitude: longitude,
        category,
        features,
        description,
        images,
      });
      return await place.save();
    } catch (err) {
      if (images.length != 0) {
        images.forEach((img) => this.deleteImageFromBackend(img));
      }
      throw err;
    }
  }

  async editPlace(data) {
    const {
      name,
      address,
      lactitude,
      longitude,
      category,
      features,
      id,
      images,
    } = data;
    try {
      let newData = {};

      if (name != "") {
        newData.name = name;
      }
      if (address != "") {
        newData.address = address;
      }
      if (lactitude != "") {
        newData.lactitude = parseFloat(lactitude);
      }
      if (longitude != "") {
        newData.longitude = parseFloat(longitude);
      }
      if (category != "") {
        newData.category = category;
      }
      if (images != []) {
        newData.images = images;
      }
      newData.features = features;

      await Place.findByIdAndUpdate({ _id: id }, newData);

      const placeStored = await Place.findById(id);

      return placeStored;
    } catch (err) {
      if (images.length != 0) {
        newData.images = place.images;
        await Place.findByIdAndUpdate({ _id: id }, newData);
        images.forEach((img) => this.deleteImageFromBackend(img));
      }
      throw err;
    }
  }

  async uploadToDrive(data) {
    const { img } = data;
    const filename = `../images/${img}`;
    const filepath = path.join(__dirname, filename);
    try {
      const response = await drive.files.create({
        requestBody: {
          name: filename,
          mimeType: "image/jpg",
        },
        media: {
          mimeType: "image/jpg",
          body: fs.createReadStream(filepath),
        },
      });
      await this.deleteImageFromBackend(img);
      return response.data.id;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async editRating(data) {
    const { place, rating, id } = data;
    let newVotesCount = place.votes_count.concat(parseInt(rating));
    const newRating = (newVotesCount) => {
      return (
        newVotesCount.reduce((a, b) => a + b, 0) / newVotesCount.length
      ).toFixed();
    };

    let newData = {};
    newData.rating = newRating(newVotesCount);
    newData.votes_count = newVotesCount;

    await Place.findByIdAndUpdate({ _id: id }, newData);

    const placeStored = await Place.findById(id);

    return placeStored;
  }

  async getPlace() {
    return await Place.find().lean().exec();
  }

  async deletePlace(id) {
    const place = await Place.findById(id);
    if (place.images.length != 0) {
      place.images.forEach((img) => this.deleteImageFromDrive(img));
    }
    return await Place.deleteOne({ _id: id });
  }

  async getFilterPlace(data) {
    const { name, category, features } = data;
    let nameFilter = {};
    let categoryFliter = {};
    let featuresFilter = {};
    if (name != "Todas") {
      nameFilter = { name: { $regex: name } };
    }
    if (category != "Todas") {
      categoryFliter = { category: category };
    }
    if (features.length != 0) {
      featuresFilter = { features: { $all: features } };
    }
    const placesFilter = Place.find({
      $and: [nameFilter, categoryFliter, featuresFilter],
    });
    return placesFilter;
  }

  async deleteImageFromPlace(data) {
    const { id, img } = data;

    try {
      const place = await Place.findById(id);

      const newImages = place.images.filter((i) => i != img);

      let newData = {};

      newData.images = newImages;

      await Place.findByIdAndUpdate({ _id: id }, newData);

      const placeUpdate = await Place.findById(id);

      await this.deleteImageFromDrive(img);

      return placeUpdate;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteImageFromBackend(img) {
    fs.unlink(`images/${img}`, function (err) {
      try {
        if (err) throw err;
      } catch (err) {
        console.log(err);
      }
    });
  }

  async deleteImageFromDrive(img) {
    try {
      const response = await drive.files.delete({
        fileId: img,
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = PlaceRepository;
