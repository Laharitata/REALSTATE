const mongoose = require('mongoose');
require('dotenv').config();

const Property = require('./models/property');

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/realestate";

const sampleProperties = [
  {
    "title": "Sunshine Apartments",
    "type": "Flat",
    "price": 4500000,
    "location": "Hyderabad",
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 1200,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1600607687920-4e2a07f94428?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Rahul Sharma",
    "ownerContact": "9876543210",
    "isRent": false
  },
  {
    "title": "Green View Residency",
    "type": "Flat",
    "price": 3800000,
    "location": "Bangalore",
    "bedrooms": 2,
    "bathrooms": 2,
    "area": 950,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Priya Verma",
    "ownerContact": "9876501234",
    "isRent": false
  },
  {
    "title": "Skyline Towers",
    "type": "Flat",
    "price": 5200000,
    "location": "Pune",
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 1300,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Arjun Patel",
    "ownerContact": "9988776655",
    "isRent": false
  },
  {
    "title": "Lakeview Residency",
    "type": "Flat",
    "price": 4000000,
    "location": "Chennai",
    "bedrooms": 2,
    "bathrooms": 2,
    "area": 1100,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1598300042247-3346a0b69b7a?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Sneha Nair",
    "ownerContact": "9898989898",
    "isRent": false
  },
  {
    "title": "Elite Towers",
    "type": "Flat",
    "price": 6000000,
    "location": "Mumbai",
    "bedrooms": 3,
    "bathrooms": 3,
    "area": 1500,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Vikram Singh",
    "ownerContact": "9123456789",
    "isRent": false
  },
  {
    "title": "Dream Villa",
    "type": "Individual House",
    "price": 8500000,
    "location": "Hyderabad",
    "bedrooms": 4,
    "bathrooms": 3,
    "area": 2000,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Neha Reddy",
    "ownerContact": "9012345678",
    "isRent": false
  },
  {
    "title": "Green Meadows",
    "type": "Individual House",
    "price": 7200000,
    "location": "Bangalore",
    "bedrooms": 3,
    "bathrooms": 3,
    "area": 1800,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1600585154207-01e5a252b8f4?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Anil Kumar",
    "ownerContact": "9090909090",
    "isRent": false
  },
  {
    "title": "Blue Haven",
    "type": "Individual House",
    "price": 6500000,
    "location": "Chennai",
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 1600,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1560185008-b033106af12d?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Kavita Menon",
    "ownerContact": "9823456789",
    "isRent": false
  },
  {
    "title": "Rosewood Bungalow",
    "type": "Individual House",
    "price": 9000000,
    "location": "Pune",
    "bedrooms": 4,
    "bathrooms": 3,
    "area": 2200,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1572120360610-d971b9c79809?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Ravi Deshmukh",
    "ownerContact": "9786543210",
    "isRent": false
  },
  {
    "title": "Serene Cottage",
    "type": "Individual House",
    "price": 7800000,
    "location": "Mumbai",
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 1700,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Deepa Iyer",
    "ownerContact": "9812345678",
    "isRent": false
  },
  {
    "title": "City Mall Shop",
    "type": "Shop",
    "price": 2500000,
    "location": "Hyderabad",
    "bedrooms": 0,
    "bathrooms": 1,
    "area": 400,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Manoj Reddy",
    "ownerContact": "9001234567",
    "isRent": false
  },
  {
    "title": "Downtown Boutique",
    "type": "Shop",
    "price": 3000000,
    "location": "Bangalore",
    "bedrooms": 0,
    "bathrooms": 1,
    "area": 500,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Divya Rao",
    "ownerContact": "9911223344",
    "isRent": false
  },
  {
    "title": "Market Plaza Shop",
    "type": "Shop",
    "price": 2700000,
    "location": "Pune",
    "bedrooms": 0,
    "bathrooms": 1,
    "area": 450,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Ajay Mehta",
    "ownerContact": "9900990099",
    "isRent": false
  },
  {
    "title": "City Center Store",
    "type": "Shop",
    "price": 3200000,
    "location": "Chennai",
    "bedrooms": 0,
    "bathrooms": 1,
    "area": 480,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1600585154084-4e2a07f94428?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Lakshmi Krishnan",
    "ownerContact": "9933445566",
    "isRent": false
  },
  {
    "title": "Metro Commercial Space",
    "type": "Shop",
    "price": 3500000,
    "location": "Mumbai",
    "bedrooms": 0,
    "bathrooms": 1,
    "area": 550,
    "status": "available",
    "images": ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"],
    "ownerName": "Karan Patel",
    "ownerContact": "9876012345",
    "isRent": false
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected');

    // Clear existing properties (optional - comment out if you want to keep existing ones)
    // await Property.deleteMany({});
    // console.log('🗑️  Cleared existing properties');

    // Insert sample properties
    const result = await Property.insertMany(sampleProperties);
    console.log(`✅ Successfully added ${result.length} sample properties to the database`);

    // Display summary
    console.log('\n📊 Summary:');
    console.log(`   - Flats: ${sampleProperties.filter(p => p.type === 'Flat').length}`);
    console.log(`   - Individual Houses: ${sampleProperties.filter(p => p.type === 'Individual House').length}`);
    console.log(`   - Shops: ${sampleProperties.filter(p => p.type === 'Shop').length}`);
    console.log(`   - Total: ${sampleProperties.length} properties`);

    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    console.log('🎉 Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
