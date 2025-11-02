// PropertyCard.js
import { useState } from "react";
import api from "./api";
import ContactSellerForm from "./ContactSellerForm";

export default function PropertyCard({ property, onRemove }) {
  const [showContact, setShowContact] = useState(false);
  const [interested, setInterested] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

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
      await api.post("/wishlist", { id: property._id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Added to Wishlist ❤️");
    } catch (err) {
      console.error(err);
      alert("Failed to add to wishlist");
    }
  };

  // Open Contact Form
  const handleBuy = () => {
    setShowContactForm(true);
  };

  // Handle successful contact request
  const handleContactSuccess = () => {
    setInterested(true);
    setShowContact(true);
  };

  // Handle Interest
  const handleInterest = async () => {
    if (!property._id) return alert("Property ID missing!");
    try {
      const token = localStorage.getItem("token");
      await api.post("/purchase", { id: property._id }, {
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
    <>
      <div style={cardStyle}>
        <img
          style={imgStyle}
          src={property.images?.[0] || "/placeholder.png"}
          alt={property.title}
        />
        <h3 style={h3Style}>{property.title}</h3>
        <div style={infoStyle}>
          {property.location} • {property.area} sqft • {property.bedrooms} bedrooms • {property.bathrooms} bathrooms
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
          {/* Buy button opens contact form */}
          <button style={buyBtn} onClick={handleBuy}>
            Buy
          </button>

          {/* Show contact button after successful contact request */}
          {interested && (
            <button style={interestBtn} onClick={() => setShowContact(!showContact)}>
              {showContact ? "Hide Contact" : "Show Contact"}
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

      {/* Contact Seller Form Modal */}
      {showContactForm && (
        <ContactSellerForm
          property={property}
          onClose={() => setShowContactForm(false)}
          onSuccess={handleContactSuccess}
        />
      )}
    </>
  );
}
