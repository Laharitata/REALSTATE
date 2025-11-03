const mongoose = require('mongoose');
require('dotenv').config();

const Property = require('./models/property');

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/realestate";

async function checkProperties() {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected\n');

    const properties = await Property.find();
    
    console.log(`📊 Total properties in database: ${properties.length}\n`);
    
    if (properties.length > 0) {
      console.log('Sample properties:');
      properties.slice(0, 3).forEach((prop, index) => {
        console.log(`\n${index + 1}. ${prop.title}`);
        console.log(`   ID: ${prop._id}`);
        console.log(`   Type: ${prop.type}`);
        console.log(`   Location: ${prop.location}`);
        console.log(`   Price: ₹${prop.price}`);
      });
    } else {
      console.log('⚠️  No properties found in database!');
    }

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkProperties();
