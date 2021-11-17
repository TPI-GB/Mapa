const Category = require("../models/category_model");

class CategoryRepository {
  async createCategory(data) {
    const { name } = data;

    const category = await Category.create({
      name,
    });

    return await category.save();
  }

  async editCategory(data) {
    const { name, id } = data;

    const newData = {
      name: name,
    };

    await Category.findByIdAndUpdate({ _id: id }, newData);

    const categoryStored = await Category.findById(id);

    return categoryStored;
  }

  async getCategory() {
    return await Category.find().lean().exec();
  }

  async deleteCategory(id) {
    return await Category.deleteOne({ _id: id });
  }
}

module.exports = CategoryRepository;
