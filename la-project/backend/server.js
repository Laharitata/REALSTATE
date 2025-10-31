 // server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken')

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded images

// ------------------ MongoDB Setup ------------------
require('dotenv').config();
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/realestate";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// ------------------ Schemas ------------------
const propertySchema = new mongoose.Schema({
  title: String,
  type: String, // Flat, Individual House, Shop
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

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
});

const purchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  date: { type: Date, default: Date.now },
});

const Property = mongoose.model("Property", propertySchema);
const Wishlist = mongoose.model("Wishlist", wishlistSchema);
const Purchase = mongoose.model("Purchase", purchaseSchema);

const User = require('./models/user');

// ------------------ Multer Setup ------------------
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ------------------ Routes ------------------

// Get all properties
app.get("/api/properties", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new property with multiple images
app.post("/api/properties", upload.array("images", 5), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Token missing" });
    const decoded = jwt.verify(token, "sectiona");
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const imagePaths = req.files.map(file => "/uploads/" + file.filename);

    const newProperty = new Property({
      title: req.body.title,
      type: req.body.category, // map category to type
      price: req.body.price,
      location: req.body.location,
      bedrooms: req.body.rooms, // map rooms to bedrooms
      bathrooms: req.body.bathrooms || 1,
      area: req.body.sqft, // map sqft to area
      ownerName: user.name,
      ownerContact: user.phone,
      images: imagePaths,
      isRent: req.body.isRent === 'true' || req.body.isRent === true,
    });

    await newProperty.save();
    res.json(newProperty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------ Wishlist ------------------

// Get wishlist
app.get("/api/wishlist", verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user._id }).populate("property");
    res.json({ wishlist: wishlist.map(w => w.property) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add to wishlist
app.post("/api/wishlist", verifyToken, async (req, res) => {
  try {
    const exists = await Wishlist.findOne({ user: req.user._id, property: req.body.id });
    if (!exists) {
      const newItem = new Wishlist({ user: req.user._id, property: req.body.id });
      await newItem.save();
    }
    const wishlist = await Wishlist.find({ user: req.user._id }).populate("property");
    res.json({ wishlist: wishlist.map(w => w.property) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from wishlist
app.delete("/api/wishlist/:id", verifyToken, async (req, res) => {
  try {
    await Wishlist.deleteOne({ user: req.user._id, property: req.params.id });
    const wishlist = await Wishlist.find({ user: req.user._id }).populate("property");
    res.json({ wishlist: wishlist.map(w => w.property) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password, email, name, phone } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email, name, phone });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ username: user.username, id: user._id }, "sectiona", { expiresIn: "1h" });
    res.json({ message: "Access granted", token, user: { username: user.username, name: user.name, email: user.email, phone: user.phone, joined: user.joined } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, "sectiona");
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}

app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "access granted", user: req.user });
});

// ------------------ Purchase History ------------------

// Get purchase history
app.get("/api/purchase-history", verifyToken, async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id }).populate("property");
    res.json({ purchases: purchases.map(p => ({ property: p.property, date: p.date })) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add purchase (when buying a property)
app.post("/api/purchase", verifyToken, async (req, res) => {
  try {
    const newPurchase = new Purchase({ user: req.user._id, property: req.body.id });
    await newPurchase.save();
    res.json({ message: "Purchase recorded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------ Server ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
