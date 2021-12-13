const express = require("express");
const CategoryService = require("../services/category_service");

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
    this.router = express.Router();
    this.router.post("/", (req, res) => this.createCategory(req, res));
    this.router.put("/:id", (req, res) => this.editCategory(req, res));
    this.router.get("/", (req, res) => this.getCategory(req, res));
    this.router.delete("/", (req, res) => this.deleteCategory(req, res));
  }

  createCategory(req, res) {
    const data = req.body;
    if (!data.name && !data.icon) {
      return res.status(400).send("All fields are required");
    }
    const categoryPromise = this.categoryService.createCategory(data);
    categoryPromise
      .then((category) => {
        res.json(category);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }

  editCategory(req, res) {
    const data = req.body;
    const { id } = req.params;
    data.id = id;
    const categoryPromise = this.categoryService.editCategory(data);
    categoryPromise
      .then((category) => {
        res.json(category);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }

  getCategory(req, res) {
    const categoryPromise = this.categoryService.getCategory();
    categoryPromise
      .then((category) => {
        res.json(category);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  deleteCategory(req, res) {
    const data = req.body;
    console.log(data);
    const { id } = data;
    const categoryPromise = this.categoryService.deleteCategory(id);
    categoryPromise
      .then((category) => {
        res.json(category);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }
}

module.exports = CategoryController;
