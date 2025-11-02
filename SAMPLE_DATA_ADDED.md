# Sample Properties Added to Database

## Summary

Successfully added **15 sample properties** to the database for demonstration purposes.

---

## 📊 Property Distribution

- **Flats**: 5 properties
- **Individual Houses**: 5 properties
- **Shops**: 5 properties
- **Total**: 15 properties

---

## 🏢 Flats (5 properties)

1. **Sunshine Apartments** - Hyderabad
   - Price: ₹45,00,000
   - 3 BHK, 2 Bathrooms, 1200 sq ft
   - Owner: Rahul Sharma (9876543210)

2. **Green View Residency** - Bangalore
   - Price: ₹38,00,000
   - 2 BHK, 2 Bathrooms, 950 sq ft
   - Owner: Priya Verma (9876501234)

3. **Skyline Towers** - Pune
   - Price: ₹52,00,000
   - 3 BHK, 2 Bathrooms, 1300 sq ft
   - Owner: Arjun Patel (9988776655)

4. **Lakeview Residency** - Chennai
   - Price: ₹40,00,000
   - 2 BHK, 2 Bathrooms, 1100 sq ft
   - Owner: Sneha Nair (9898989898)

5. **Elite Towers** - Mumbai
   - Price: ₹60,00,000
   - 3 BHK, 3 Bathrooms, 1500 sq ft
   - Owner: Vikram Singh (9123456789)

---

## 🏡 Individual Houses (5 properties)

1. **Dream Villa** - Hyderabad
   - Price: ₹85,00,000
   - 4 BHK, 3 Bathrooms, 2000 sq ft
   - Owner: Neha Reddy (9012345678)

2. **Green Meadows** - Bangalore
   - Price: ₹72,00,000
   - 3 BHK, 3 Bathrooms, 1800 sq ft
   - Owner: Anil Kumar (9090909090)

3. **Blue Haven** - Chennai
   - Price: ₹65,00,000
   - 3 BHK, 2 Bathrooms, 1600 sq ft
   - Owner: Kavita Menon (9823456789)

4. **Rosewood Bungalow** - Pune
   - Price: ₹90,00,000
   - 4 BHK, 3 Bathrooms, 2200 sq ft
   - Owner: Ravi Deshmukh (9786543210)

5. **Serene Cottage** - Mumbai
   - Price: ₹78,00,000
   - 3 BHK, 2 Bathrooms, 1700 sq ft
   - Owner: Deepa Iyer (9812345678)

---

## 🏪 Shops (5 properties)

1. **City Mall Shop** - Hyderabad
   - Price: ₹25,00,000
   - 400 sq ft, 1 Bathroom
   - Owner: Manoj Reddy (9001234567)

2. **Downtown Boutique** - Bangalore
   - Price: ₹30,00,000
   - 500 sq ft, 1 Bathroom
   - Owner: Divya Rao (9911223344)

3. **Market Plaza Shop** - Pune
   - Price: ₹27,00,000
   - 450 sq ft, 1 Bathroom
   - Owner: Ajay Mehta (9900990099)

4. **City Center Store** - Chennai
   - Price: ₹32,00,000
   - 480 sq ft, 1 Bathroom
   - Owner: Lakshmi Krishnan (9933445566)

5. **Metro Commercial Space** - Mumbai
   - Price: ₹35,00,000
   - 550 sq ft, 1 Bathroom
   - Owner: Karan Patel (9876012345)

---

## 🌆 Location Distribution

- **Hyderabad**: 3 properties (1 Flat, 1 House, 1 Shop)
- **Bangalore**: 3 properties (1 Flat, 1 House, 1 Shop)
- **Pune**: 3 properties (1 Flat, 1 House, 1 Shop)
- **Chennai**: 3 properties (1 Flat, 1 House, 1 Shop)
- **Mumbai**: 3 properties (1 Flat, 1 House, 1 Shop)

---

## 💰 Price Range

- **Flats**: ₹38,00,000 - ₹60,00,000
- **Houses**: ₹65,00,000 - ₹90,00,000
- **Shops**: ₹25,00,000 - ₹35,00,000

---

## 📸 Images

All properties include high-quality images from Unsplash:
- Professional real estate photography
- Properly formatted URLs
- Optimized for web display (1200px width)

---

## ✅ Verification

The sample data has been successfully added to the MongoDB database and is now:
- ✅ Visible on the Buy page (http://localhost:5173/buy)
- ✅ Accessible via API endpoint (GET /api/properties)
- ✅ Filterable by price, area, bedrooms, and type
- ✅ Categorized into Flats, Houses, and Shops sections

---

## 🔄 Re-running the Seed Script

To add these properties again (if database is cleared):
```bash
cd la-project/backend
node seedProperties.js
```

**Note**: The script will add new entries each time it's run. To avoid duplicates, you can uncomment the line in `seedProperties.js` that clears existing properties before seeding.

---

## 🗑️ Clearing Sample Data

If you want to remove all sample properties from the database, you can use MongoDB commands or create a cleanup script.

---

## 📝 Notes

- All properties have `status: "available"`
- All properties have `isRent: false` (for sale, not rent)
- Shop properties have `bedrooms: 0` (not applicable)
- All properties include owner contact information
- Images are hosted on Unsplash CDN (reliable and fast)

---

**The buyer page now has 15 beautiful sample properties to browse!** 🎉
