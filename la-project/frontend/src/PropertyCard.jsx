// PropertyCard.js
import { useState } from "react";
import axios from "axios";

export default function PropertyCard({ property, onRemove }) {
  const [showContact, setShowContact] = useState(false);
  const [interested, setInterested] = useState(false);

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s",
  };

  const imgStyle = { width: "100%", height: "180px", objectFit: "cover" };
  const h3Style = { margin: "12px", color: "#2c3e50" };
  const infoStyle = { margin: "0 12px 12px 12px", fontSize: "14px", color: "#555" };
  const buttonStyle = {
    padding: "10px",
    margin: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  };

  const wishlistBtn = { ...buttonStyle, backgroundColor: "#e67e22", color: "#fff" };
  const removeBtn = { ...buttonStyle, backgroundColor: "#e74c3c", color: "#fff" };
  const buyBtn = { ...buttonStyle, backgroundColor: "#27ae60", color: "#fff" };
  const interestBtn = { ...buttonStyle, backgroundColor: "#3498db", color: "#fff" };

  // Add to Wishlist
  const handleWishlist = async () => {
    if (!property._id) return alert("Property ID missing!");
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/wishlist", { id: property._id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Added to Wishlist ❤️");
    } catch (err) {
      console.error(err);
      alert("Failed to add to wishlist");
    }
  };

  // Buy Property
  const handleBuy = async () => {
    if (!property._id) return alert("Property ID missing!");
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/purchase", { id: property._id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Property purchased successfully! 🎉");
    } catch (err) {
      console.error(err);
      alert("Failed to purchase property");
    }
  };

  // Handle Interest
  const handleInterest = async () => {
    if (!property._id) return alert("Property ID missing!");
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/purchase", { id: property._id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInterested(true);
      setShowContact(true);
      alert("Added to purchase history. Contact details shown. You can proceed with the owner.");
    } catch (err) {
      console.error(err);
      alert("Failed to record interest.");
    }
  };

  return (
    <div style={cardStyle}>
      <img
        style={imgStyle}
        src={property.images?.[0] || property.image || "/placeholder.png"}
        alt={property.title}
      />
      <h3 style={h3Style}>{property.title}</h3>
      <div style={infoStyle}>
        {property.location} • {property.area || property.sqft} sqft • {property.bedrooms || property.rooms} rooms
      </div>
      <div style={infoStyle}>₹{property.price} {property.isRent ? "(Rent)" : "(Buy)"}</div>

      {showContact && (
        <div style={infoStyle}>
          Owner: {property.ownerName}
          <br />
          Contact: {property.ownerContact}
        </div>
      )}

      <div>
        {/* Buy button toggles contact */}
        <button style={buyBtn} onClick={() => setShowContact(!showContact)}>
          {showContact ? "Hide Contact" : "Buy"}
        </button>

        {/* Interested button */}
        {!interested && (
          <button style={interestBtn} onClick={handleInterest}>
            Interested
          </button>
        )}

        {/* If onRemove prop exists, show Remove from Wishlist */}
        {!onRemove ? (
          <button style={wishlistBtn} onClick={handleWishlist}>
            Add to Wishlist
          </button>
        ) : (
          <button style={removeBtn} onClick={onRemove}>
            Remove from Wishlist
          </button>
        )}
      </div>
    </div>
  );
}
