const mongoose = require('mongoose');

const WATCH_TYPES = [
  'Analog Watch',
  'Digital Watch',
  'Smartwatch',
  'Hybrid Watch',
  'Wall Clock',
  'Table Clock',
  'Pocket Watch'
];

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: {
      values: WATCH_TYPES,
      message: 'Category must be one of the defined watch types.'
    }
  },
  description: {
    type: String,
    trim: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  hasDiscount: {
    type: Boolean,
    default: false
  },
  discountValue: {
    type: Number,
    min: 0,
    validate: {
      validator: function (value) {
        return !this.hasDiscount || value > 0;
      },
      message: 'Discount value must be greater than 0 if hasDiscount is true.'
    }
  },
  image: {
    type: [String], // Array of strings to handle multiple images
    
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
module.exports.WATCH_TYPES = WATCH_TYPES; // Export if needed elsewhere
