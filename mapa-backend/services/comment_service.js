const CommentRepository = require("../repositories/comment_repository");

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async createComment(data) {
    const comment = await this.CommentRepository.createComment(data);
    return comment;
  }
}

module.exports = CommentService;
