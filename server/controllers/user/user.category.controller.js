const categoryService = require('#services/user/user.category.service');

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategoriesService();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories
};
