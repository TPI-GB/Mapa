const CommentService = require("../services/comment_service");
const express = require("express");

class CommentController {
  constructor() {
    this.commentService = new CommentService();
    this.router = express.Router();
    this.router.put("/", (req, res) => this.addCommentToPlace(req, res));
    this.router.delete("/", (req, res) => this.deleteComment(req, res));
  }

  addCommentToPlace(req, res) {
    const data = req.body;
    if (!data.place || !data.comment) {
      return res.status(400).send("All fields are required");
    }
    const commentPromise = this.commentService.addCommentToPlace(data);
    commentPromise
      .then((comment) => {
        res.json(comment);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }

  deleteComment(req, res) {
    const data = req.body;
    const commentPromise = this.commentService.deleteComment(data);
    commentPromise
      .then((comment) => {
        res.json(comment);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }
}

module.exports = CommentController;
