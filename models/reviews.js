const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema ({
  title: {type: String, require: true},
  img: {type: String, require: false},
  genre: {type: String, require: false},
  review: {type: String, required: true},
  streamingOn: {type: Array, required: true, default: "None"},
  tags: [String],
  similarTo: {type: Array, required: false}
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;