const CommentRepository = require("../repositories/comment_repository");

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async createComment(data) {
    const comment = await this.commentRepository.createComment(data);
    return comment;
  }

  async addCommentToPlace(data) {
    const comment = await this.commentRepository.addCommentToPlace(data);
    return comment;
  }
}

module.exports = CommentService;
