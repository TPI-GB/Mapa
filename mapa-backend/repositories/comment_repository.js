const Comment = require("../models/comment_model");

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

    const newComments = place.comments.push(comment);

    const newPlace = await Place.findByIdAndUpdate({ _id: id }, newData);

    return newPlace;
  }
}

module.exports = CommentRepository;
