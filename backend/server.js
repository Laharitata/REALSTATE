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
mongoose.connect(mongoURI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// ------------------ Schemas ------------------
const Property = require('./models/property');

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
});

const purchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  date: { type: Date, default: Date.now },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
const Purchase = mongoose.model("Purchase", purchaseSchema);

const User = require('./models/user');
const ContactRequest = require('./models/contactRequest');
const Appointment = require('./models/appointment');
const Offer = require('./models/offer');

// ------------------ Multer Setup ------------------
// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ------------------ Routes ------------------

// Root route - health check
app.get("/", (req, res) => {
  res.json({ 
    message: "Real Estate API is running", 
    status: "OK",
    endpoints: {
      properties: "/api/properties",
      wishlist: "/api/wishlist",
      contactRequests: "/api/contact-requests",
      auth: {
        signup: "/signup",
        login: "/login",
        profile: "/profile"
      }
    }
  });
});

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "sectiona");
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const imagePaths = req.files ? req.files.map(file => "/uploads/" + file.filename) : [];

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

    const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET || "sectiona", { expiresIn: "1h" });
    res.json({ message: "Access granted", token, user: { username: user.username, name: user.name, email: user.email, phone: user.phone, joined: user.joined } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "sectiona");
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

// ------------------ Contact Requests ------------------

// Submit contact request
app.post("/api/contact-requests", verifyToken, async (req, res) => {
  try {
    const { propertyId, message } = req.body;
    
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const newContactRequest = new ContactRequest({
      buyer: req.user._id,
      property: propertyId,
      buyerName: req.user.name,
      buyerEmail: req.user.email,
      buyerPhone: req.user.phone || '',
      message: message
    });

    await newContactRequest.save();
    res.json({ message: "Contact request submitted successfully", contactRequest: newContactRequest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's contact requests
app.get("/api/contact-requests", verifyToken, async (req, res) => {
  try {
    const requests = await ContactRequest.find({ buyer: req.user._id })
      .populate("property")
      .sort({ createdAt: -1 });
    res.json({ contactRequests: requests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get contact requests for seller's properties
app.get("/api/contact-requests/seller", verifyToken, async (req, res) => {
  try {
    // Find all properties owned by the user
    const userProperties = await Property.find({ ownerContact: req.user.phone });
    const propertyIds = userProperties.map(p => p._id);
    
    // Find all contact requests for these properties
    const requests = await ContactRequest.find({ property: { $in: propertyIds } })
      .populate("property")
      .populate("buyer", "name email phone")
      .sort({ createdAt: -1 });
    
    res.json({ contactRequests: requests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------ Appointments ------------------

// Submit appointment request
app.post("/api/appointments", verifyToken, async (req, res) => {
  try {
    const { propertyId, appointmentDate, appointmentTime, appointmentType, message } = req.body;
    
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const newAppointment = new Appointment({
      buyer: req.user._id,
      property: propertyId,
      buyerName: req.user.name,
      buyerEmail: req.user.email,
      buyerPhone: req.user.phone || '',
      appointmentDate,
      appointmentTime,
      appointmentType,
      message
    });

    await newAppointment.save();
    res.json({ message: "Appointment scheduled successfully", appointment: newAppointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's appointments
app.get("/api/appointments", verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ buyer: req.user._id })
      .populate("property")
      .sort({ appointmentDate: 1 });
    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update appointment status
app.patch("/api/appointments/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("property");
    
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    
    res.json({ message: "Appointment updated successfully", appointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------ Offers ------------------

// Submit offer
app.post("/api/offers", verifyToken, async (req, res) => {
  try {
    const { propertyId, offerAmount, message, financingType } = req.body;
    
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const newOffer = new Offer({
      buyer: req.user._id,
      property: propertyId,
      buyerName: req.user.name,
      buyerEmail: req.user.email,
      buyerPhone: req.user.phone || '',
      offerAmount,
      message,
      financingType
    });

    await newOffer.save();
    res.json({ message: "Offer submitted successfully", offer: newOffer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's offers
app.get("/api/offers", verifyToken, async (req, res) => {
  try {
    const offers = await Offer.find({ buyer: req.user._id })
      .populate("property")
      .sort({ createdAt: -1 });
    res.json({ offers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update offer status (for sellers)
app.patch("/api/offers/:id", verifyToken, async (req, res) => {
  try {
    const { status, counterOffer } = req.body;
    const updateData = { status, updatedAt: Date.now() };
    
    if (counterOffer) {
      updateData.counterOffer = {
        amount: counterOffer.amount,
        message: counterOffer.message,
        date: Date.now()
      };
    }
    
    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("property");
    
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }
    
    res.json({ message: "Offer updated successfully", offer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get offers for seller's properties
app.get("/api/offers/seller", verifyToken, async (req, res) => {
  try {
    const userProperties = await Property.find({ ownerContact: req.user.phone });
    const propertyIds = userProperties.map(p => p._id);
    
    const offers = await Offer.find({ property: { $in: propertyIds } })
      .populate("property")
      .populate("buyer", "name email phone")
      .sort({ createdAt: -1 });
    
    res.json({ offers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
