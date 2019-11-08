const mongoose = require('mongoose');

// required: true
// minlength: 5
// maxlength: 50

// type: Date
// type: String
// type: Number

// type: mongoose.Types.ObjectId,
    // ref: 'Sub-entity'

const entitySchema = new mongoose.Schema({
  merchant: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  vault: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  report: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Expense', entitySchema);