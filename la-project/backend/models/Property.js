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
  image: String,
});

module.exports = mongoose.model("Property", PropertySchema);
