const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: String,
  type: String,
  price: Number,
  location: String,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  status: { type: String, default: "available" },
  images: [String],
  ownerName: String,
  ownerContact: String,
  isRent: { type: Boolean, default: false },
});

module.exports = mongoose.model("Property", PropertySchema);
