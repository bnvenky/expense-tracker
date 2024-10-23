const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../controllers/categoryController');

// Route to add a new category
router.post('/categories', addCategory);

// Route to get all categories
router.get('/categories', getCategories);

module.exports = router;
