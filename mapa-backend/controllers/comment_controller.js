const CommentService = require("../services/comment_service");
const express = require("express");

class CommentController {
  constructor() {
    this.commentService = new CommentService();
    this.router = express.Router();
    this.router.post("/", (req, res) => this.createComment(req, res));
    this.router.put("/", (req, res) => this.addCommentToPlace(req, res));
  }

  createComment(req, res) {
    const data = req.body;
    if (!data.name || !data.text) {
      return res.status(400).send("All fields are required");
    }
    const commentPromise = this.commentService.createComment(data);
    commentPromise
      .then((comment) => {
        res.json(comment);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
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
}

module.exports = CommentController;
