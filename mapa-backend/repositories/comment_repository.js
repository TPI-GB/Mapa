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
}

module.exports = CommentRepository;
