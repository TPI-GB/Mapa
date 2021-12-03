const Place = require("../models/places_model");

class PlaceRepository {
  async createPlace(data) {
    const {
      name,
      address,
      lactitude,
      longitude,
      categories,
      features,
      description,
    } = data;

    const place = await Place.create({
      name,
      address,
      lactitude,
      longitude,
      categories,
      features,
      description,
    });

    if (data.file) {
      const { filename } = data.file;
      place.setImgUrl(filename);
    }

    return await place.save();
  }

  async editPlace(data) {
    const {
      name,
      address,
      lactitude,
      longitude,
      categories,
      features,
      description,
      id,
    } = data;

    let newData = {};

    const place = await Place.findById(id);

    if (name != "") {
      newData.name = name;
    }
    if (address != "") {
      newData.address = address;
    }
    if (lactitude != "") {
      newData.lactitude = lactitude;
    }
    if (longitude != "") {
      newData.longitude = longitude;
    }
    if (categories != "") {
      newData.categories = categories;
    }
    if (features != "") {
      newData.features = features;
    }
    if (place.description === undefined || description != "") {
      newData.description = description;
    }

    await Place.findByIdAndUpdate({ _id: id }, newData);

    const placeStored = await Place.findById(id);

    return placeStored;
  }

  async editRating(data) {
    const { place, rating } = data;
    const newVotesCount = place.votes_count + 1;
    const newRating = (place.rating + rating) / newVotesCount;

    let newData = {};
    newData.rating = newRating;
    newData.votes_count = newVotesCount;

    await Place.findByIdAndUpdate({ _id: place.id }, newData);

    const placeStored = await Place.findById(place.id);

    return placeStored;
  }

  async getPlace() {
    return await Place.find().lean().exec();
  }

  async deletePlace(id) {
    return await Place.deleteOne({ _id: id });
  }
}

module.exports = PlaceRepository;
