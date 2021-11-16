const CategoryRepository = require("../repositories/category_repository");

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(data) {
    const category = await this.categoryRepository.createCategory(data);
    return category;
  }

  async editCategory(data) {
    const newCategory = await this.categoryRepository.editCategory(data);
    return newCategory;
  }

  async getCategory() {
    const categories = await this.categoryRepository.getCategory();
    return categories;
  }

  async deleteCategory(id) {
    const category = await this.categoryRepository.deleteCategory(id);
    return category;
  }
}

module.exports = CategoryService;
