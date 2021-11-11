const Place = require("../models/places_model");

class PlaceRepository {
  async createPlace(data) {
    const { name, address, lactitude, longitude, category, features } = data;

    const place = await Place.create({
      name,
      address,
      lactitude,
      longitude,
      category,
      //features,
    });

    return await place.save();
  }

  async editPlace(data) {
    const { name, address, lactitude, longitude, features, id } = data;

    const newData = {
      name: name,
      address: address,
      lactitude: lactitude,
      longitude: longitude,
      //features: features,
    };

    await Place.findByIdAndUpdate({ _id: id }, newData);

    const placeStored = await Place.findById(id);

    return placeStored;
  }

  async getPlace() {
    return await Place.find().lean().exec();
  }

  async deletePlace({ _id: id }) {
    return await Place.deleteOne(id);
  }
}

module.exports = PlaceRepository;
