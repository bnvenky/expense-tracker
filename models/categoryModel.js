const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],  // Each category is either for income or expenses
    required: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
