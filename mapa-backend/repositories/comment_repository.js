const Comment = require("../models/comment_model");
const Place = require("../models/places_model");

class CommentRepository {
  async createComment(data) {
    const { name, text } = data;

    const comment = await Comment.create({
      name,
      text,
    });

    return await comment.save();
  }

  async addCommentToPlace(data) {
    const { place, comment } = data;
    let newComments = {};
    newComments.comments = place.comments.concat(comment);
    await Place.findByIdAndUpdate({ _id: place._id }, newComments);
    const placeStored = await Place.findById(place._id);

    return placeStored;
  }
}

module.exports = CommentRepository;
