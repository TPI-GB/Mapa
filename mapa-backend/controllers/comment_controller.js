const CommentService = require("../services/comment_service");
const express = require("express");

class CommentController {
  constructor() {
    this.commentService = new CommentService();
    this.router = express.Router();
    this.router.post("/", (req, res) => this.createComment(req, res));
  }

  createComment(req, res) {
    const data = req.body;
    if (!data.name || !data.text) {
      return res.status(400).send("All fields are required");
    }
    const commentPromise = this.commentPromise.createCategory(data);
    commentPromise
      .then((comment) => {
        res.json(comment);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
}

module.exports = CommentController;
