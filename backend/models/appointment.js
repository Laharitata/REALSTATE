const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
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
  appointmentDate: { 
    type: Date, 
    required: true 
  },
  appointmentTime: { 
    type: String, 
    required: true 
  },
  appointmentType: { 
    type: String, 
    enum: ['in-person', 'virtual', 'phone'], 
    default: 'in-person' 
  },
  message: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
