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
    const { name, address, lactitude, longitude, category, features, id } =
      data;

    const newData = {
      name: name,
      address: address,
      lactitude: lactitude,
      longitude: longitude,
      category: category,
      //features: features,
    };

    await Place.findByIdAndUpdate({ _id: id }, newData);

    const placeStored = await Place.findById(id);

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
