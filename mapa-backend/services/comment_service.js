const CommentRepository = require("../repositories/comment_repository");

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async addCommentToPlace(data) {
    const comment = await this.commentRepository.addCommentToPlace(data);
    return comment;
  }

  async deleteComment(data) {
    const comment = await this.commentRepository.deleteComment(data);
    return comment;
  }
}

module.exports = CommentService;
