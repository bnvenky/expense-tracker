const Category = require('../models/categoryModel');

// Add a new category
const addCategory = async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ error: 'Both name and type are required' });
  }

  try {
    const category = new Category({ name, type });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add category' });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch categories' });
  }
};

module.exports = {
  addCategory,
  getCategories,
};
