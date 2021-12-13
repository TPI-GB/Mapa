const Category = require("../models/category_model");

class CategoryRepository {
  async createCategory(data) {
    const { name, icon } = data;

    const category = await Category.create({
      name,
      icon,
    });

    return await category.save();
  }

  async editCategory(data) {
    const { name, icon, id } = data;

    const newData = {};

    if (name != "") {
      newData.name = name;
    }
    if (icon != "") {
      newData.icon = icon;
    }

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
