const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  propertyId: String,
  title: String,
  type: String,
  price: Number,
  location: String,
  image: String,
});

module.exports = mongoose.model("Wishlist", WishlistSchema);
