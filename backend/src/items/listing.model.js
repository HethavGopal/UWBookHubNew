const mongoose = require('mongoose');


const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  condition: {
    type: String,
    required: true,
    enum: ['new', 'like-new', 'good', 'fair']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  meetingPoint: {
    type: String
  },
  ownerUID: {
    type: String,
    required: true
  }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;


