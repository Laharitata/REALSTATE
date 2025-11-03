const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  buyer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  property: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Property', 
    required: true 
  },
  buyerName: { 
    type: String, 
    required: true 
  },
  buyerEmail: { 
    type: String, 
    required: true 
  },
  buyerPhone: { 
    type: String 
  },
  offerAmount: { 
    type: Number, 
    required: true 
  },
  message: { 
    type: String 
  },
  financingType: { 
    type: String, 
    enum: ['cash', 'mortgage', 'loan', 'other'], 
    default: 'mortgage' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'countered', 'withdrawn'], 
    default: 'pending' 
  },
  counterOffer: {
    amount: Number,
    message: String,
    date: Date
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Offer', offerSchema);
