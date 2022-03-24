const PlaceRepository = require("../repositories/place_repository");

class PlaceService {
  constructor() {
    this.placeRepository = new PlaceRepository();
  }

  async createPlace(data) {
    const place = await this.placeRepository.createPlace(data);
    return place;
  }

  async editPlace(data) {
    const newPlace = await this.placeRepository.editPlace(data);
    return newPlace;
  }

  async editRating(data) {
    const newPlace = await this.placeRepository.editRating(data);
    return newPlace;
  }

  async getPlace() {
    const places = await this.placeRepository.getPlace();
    return places;
  }

  async deletePlace(id) {
    const place = await this.placeRepository.deletePlace(id);
    return place;
  }

  async getFilterPlace(data) {
    const place = await this.placeRepository.getFilterPlace(data);
    return place;
  }

  async deleteImageFromPlace(data) {
    const place = await this.placeRepository.deleteImageFromPlace(data);
    return place;
  }
}

module.exports = PlaceService;
