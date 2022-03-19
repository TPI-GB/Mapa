const Place = require("../models/places_model");
const fs = require("fs");

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
        images.forEach((img) => {
          fs.unlink(`images/${img}`, function (err) {
            try {
              if (err) throw err;
            } catch (err) {
              console.log(err);
            }
          });
        });
      }
      throw err;
    }
  }

  async editPlace(data) {
    const { name, address, lactitude, longitude, category, features, id } =
      data;
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
        images.forEach((img) => {
          fs.unlink(`images/${img}`, function (err) {
            try {
              if (err) throw err;
            } catch (err) {
              console.log(err);
            }
          });
        });
      }
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
      place.images.forEach((img) => {
        fs.unlink(`images/${img}`, function (err) {
          try {
            if (err) throw err;
          } catch (err) {
            console.log(err);
          }
        });
      });
    }
    return await Place.deleteOne({ _id: id });
  }

  async getFilterPlace(data) {
    console.log(data);
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
}

module.exports = PlaceRepository;
