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

    const response = place.comments.push(comment);

    return await response;
  }
}

module.exports = CommentRepository;
