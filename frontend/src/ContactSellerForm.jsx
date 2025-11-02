import { useState, useEffect } from "react";
import api from "./api";

export default function ContactSellerForm({ property, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    message: "I'm interested in buying this property. Please contact me for further details."
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Auto-fill user data from localStorage or fetch from profile
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await api.get("/profile", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const user = response.data.user;
          setFormData(prev => ({
            ...prev,
            buyerName: user.name || "",
            buyerEmail: user.email || "",
            buyerPhone: user.phone || ""
          }));
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      await api.post("/contact-requests", {
        propertyId: property._id,
        message: formData.message
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Contact request submitted successfully! The seller will reach out to you soon.");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Error submitting contact request:", err);
      setError(err.response?.data?.error || "Failed to submit contact request");
    } finally {
      setLoading(false);
    }
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "500px",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)"
  };

  const headerStyle = {
    marginBottom: "20px",
    color: "#2c3e50",
    fontSize: "24px",
    fontWeight: "bold"
  };

  const propertyInfoStyle = {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    color: "#555"
  };

  const formGroupStyle = {
    marginBottom: "20px"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#2c3e50",
    fontSize: "14px"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box"
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "120px",
    resize: "vertical",
    fontFamily: "inherit"
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "25px"
  };

  const submitButtonStyle = {
    flex: 1,
    padding: "12px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.6 : 1
  };

  const cancelButtonStyle = {
    flex: 1,
    padding: "12px",
    backgroundColor: "#95a5a6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  };

  const errorStyle = {
    color: "#e74c3c",
    fontSize: "14px",
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#fadbd8",
    borderRadius: "4px"
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={headerStyle}>Contact the Seller</h2>
        
        <div style={propertyInfoStyle}>
          <strong>Property:</strong> {property.title}<br />
          <strong>Location:</strong> {property.location}<br />
          <strong>Price:</strong> ₹{property.price}
        </div>

        <p style={{ marginBottom: "20px", color: "#555", fontSize: "14px" }}>
          Fill this form to express your interest in buying this property.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Buyer Name *</label>
            <input
              type="text"
              name="buyerName"
              value={formData.buyerName}
              onChange={handleChange}
              style={inputStyle}
              required
              readOnly
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Buyer Email *</label>
            <input
              type="email"
              name="buyerEmail"
              value={formData.buyerEmail}
              onChange={handleChange}
              style={inputStyle}
              required
              readOnly
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Buyer Contact</label>
            <input
              type="tel"
              name="buyerPhone"
              value={formData.buyerPhone}
              onChange={handleChange}
              style={inputStyle}
              readOnly
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={textareaStyle}
              required
              placeholder="Enter your message to the seller..."
            />
          </div>

          {error && <div style={errorStyle}>{error}</div>}

          <div style={buttonContainerStyle}>
            <button
              type="submit"
              style={submitButtonStyle}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={cancelButtonStyle}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
