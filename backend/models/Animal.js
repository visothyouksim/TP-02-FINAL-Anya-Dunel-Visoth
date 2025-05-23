const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  species: {
    type: String,
    required: true,
    enum: ['Chien', 'Chat']
  },
  breed: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 25
  },
  gender: {
    type: String,
    required: true,
    enum: ['Mâle', 'Femelle']
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  vaccinated: {
    type: Boolean,
    default: false
  },
  sterilized: {
    type: Boolean,
    default: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Animal', animalSchema);