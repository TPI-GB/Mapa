const Place = require("../models/places_model");
const { v4: uuidv4 } = require("uuid");

class CommentRepository {
  async addCommentToPlace(data) {
    const { place, comment } = data;
    comment.id = uuidv4();
    let newComments = {};
    newComments.comments = place.comments.concat(comment);
    await Place.findByIdAndUpdate({ _id: place._id }, newComments);
    const placeStored = await Place.findById(place._id);
    return placeStored;
  }

  async deleteComment(data) {
    try {
      const { id, place } = data;
      let newComments = {};
      newComments.comments = place.comments.filter((c) => c.id !== id);
      await Place.findByIdAndUpdate({ _id: place._id }, newComments);
      const placeStored = await Place.findById(place._id);
      return placeStored;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = CommentRepository;
