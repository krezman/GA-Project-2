const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema ({
  title: {type: String, require: true},
  img: {type: String, require: true},
  genre: {type: String, require: false},
  review: {type: String},
  streamingOn: {type: Array, default: "None", required: true},
  tags: [String],
  similarTo: {type: Array, required: true}
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;