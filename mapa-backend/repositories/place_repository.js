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

    if (req.file) {
      const { filename } = req.file;
      place.setImgUrl(filename);
    }

    return await place.save();
  }

  async editPlace(data) {
    const { name, address, lactitude, longitude, category, features, id } =
      data;

    let newData = {};

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
    if (category != "") {
      newData.category = category;
    }
    if (features != "") {
      newData.features = features;
    }

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
