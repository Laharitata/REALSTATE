import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function BuyOptionsModal({ property, onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState("contact"); // contact, appointment, offer
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // User data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // Contact form data
  const [contactData, setContactData] = useState({
    message: "I'm interested in this property. Please contact me for further details."
  });

  // Appointment form data
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    type: "in-person",
    message: ""
  });

  // Offer form data
  const [offerData, setOfferData] = useState({
    amount: property.price,
    financingType: "mortgage",
    message: ""
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const user = response.data.user;
        setUserData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || ""
        });
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/contact-requests`,
        {
          propertyId: property._id,
          message: contactData.message
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess("Contact request submitted successfully!");
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit contact request");
    } finally {
      setLoading(false);
    }
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/appointments`,
        {
          propertyId: property._id,
          appointmentDate: appointmentData.date,
          appointmentTime: appointmentData.time,
          appointmentType: appointmentData.type,
          message: appointmentData.message
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess("Appointment scheduled successfully!");
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to schedule appointment");
    } finally {
      setLoading(false);
    }
  };

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/offers`,
        {
          propertyId: property._id,
          offerAmount: offerData.amount,
          financingType: offerData.financingType,
          message: offerData.message
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess("Offer submitted successfully!");
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit offer");
    } finally {
      setLoading(false);
    }
  };

  // Styles
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
    padding: "0",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)"
  };

  const headerStyle = {
    padding: "20px 30px",
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const tabsContainerStyle = {
    display: "flex",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#f8f9fa"
  };

  const tabStyle = (isActive) => ({
    flex: 1,
    padding: "15px",
    textAlign: "center",
    cursor: "pointer",
    border: "none",
    backgroundColor: isActive ? "#fff" : "transparent",
    borderBottom: isActive ? "3px solid #27ae60" : "none",
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "#27ae60" : "#666",
    transition: "all 0.3s"
  });

  const contentStyle = {
    padding: "30px"
  };

  const propertyInfoStyle = {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px"
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
    minHeight: "100px",
    resize: "vertical",
    fontFamily: "inherit"
  };

  const selectStyle = {
    ...inputStyle
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

  const messageStyle = (type) => ({
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "15px",
    backgroundColor: type === "error" ? "#fadbd8" : "#d4edda",
    color: type === "error" ? "#e74c3c" : "#155724",
    fontSize: "14px"
  });

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0, color: "#2c3e50" }}>Buy Property Options</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666"
            }}
          >
            ×
          </button>
        </div>

        <div style={tabsContainerStyle}>
          <button
            style={tabStyle(activeTab === "contact")}
            onClick={() => setActiveTab("contact")}
          >
            📧 Contact Seller
          </button>
          <button
            style={tabStyle(activeTab === "appointment")}
            onClick={() => setActiveTab("appointment")}
          >
            📅 Book Viewing
          </button>
          <button
            style={tabStyle(activeTab === "offer")}
            onClick={() => setActiveTab("offer")}
          >
            💰 Make Offer
          </button>
        </div>

        <div style={contentStyle}>
          <div style={propertyInfoStyle}>
            <strong>Property:</strong> {property.title}<br />
            <strong>Location:</strong> {property.location}<br />
            <strong>Price:</strong> ₹{property.price?.toLocaleString()}
          </div>

          {error && <div style={messageStyle("error")}>{error}</div>}
          {success && <div style={messageStyle("success")}>{success}</div>}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <form onSubmit={handleContactSubmit}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Your Name</label>
                <input
                  type="text"
                  value={userData.name}
                  style={inputStyle}
                  readOnly
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Your Email</label>
                <input
                  type="email"
                  value={userData.email}
                  style={inputStyle}
                  readOnly
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Your Phone</label>
                <input
                  type="tel"
                  value={userData.phone}
                  style={inputStyle}
                  readOnly
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Message *</label>
                <textarea
                  value={contactData.message}
                  onChange={(e) => setContactData({ message: e.target.value })}
                  style={textareaStyle}
                  required
                  placeholder="Enter your message..."
                />
              </div>

              <div style={buttonContainerStyle}>
                <button type="submit" style={submitButtonStyle} disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
                <button type="button" onClick={onClose} style={cancelButtonStyle}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Appointment Tab */}
          {activeTab === "appointment" && (
            <form onSubmit={handleAppointmentSubmit}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Preferred Date *</label>
                <input
                  type="date"
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                  style={inputStyle}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Preferred Time *</label>
                <input
                  type="time"
                  value={appointmentData.time}
                  onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Viewing Type *</label>
                <select
                  value={appointmentData.type}
                  onChange={(e) => setAppointmentData({ ...appointmentData, type: e.target.value })}
                  style={selectStyle}
                  required
                >
                  <option value="in-person">In-Person Visit</option>
                  <option value="virtual">Virtual Tour</option>
                  <option value="phone">Phone Call</option>
                </select>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Additional Notes</label>
                <textarea
                  value={appointmentData.message}
                  onChange={(e) => setAppointmentData({ ...appointmentData, message: e.target.value })}
                  style={textareaStyle}
                  placeholder="Any specific requirements or questions..."
                />
              </div>

              <div style={buttonContainerStyle}>
                <button type="submit" style={submitButtonStyle} disabled={loading}>
                  {loading ? "Scheduling..." : "Schedule Viewing"}
                </button>
                <button type="button" onClick={onClose} style={cancelButtonStyle}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Offer Tab */}
          {activeTab === "offer" && (
            <form onSubmit={handleOfferSubmit}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Your Offer Amount (₹) *</label>
                <input
                  type="number"
                  value={offerData.amount}
                  onChange={(e) => setOfferData({ ...offerData, amount: e.target.value })}
                  style={inputStyle}
                  required
                  min="0"
                  step="1000"
                />
                <small style={{ color: "#666", fontSize: "12px" }}>
                  Listed Price: ₹{property.price?.toLocaleString()}
                </small>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Financing Type *</label>
                <select
                  value={offerData.financingType}
                  onChange={(e) => setOfferData({ ...offerData, financingType: e.target.value })}
                  style={selectStyle}
                  required
                >
                  <option value="cash">Cash</option>
                  <option value="mortgage">Mortgage/Home Loan</option>
                  <option value="loan">Personal Loan</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Additional Terms/Message</label>
                <textarea
                  value={offerData.message}
                  onChange={(e) => setOfferData({ ...offerData, message: e.target.value })}
                  style={textareaStyle}
                  placeholder="Include any conditions, timeline, or additional information..."
                />
              </div>

              <div style={buttonContainerStyle}>
                <button type="submit" style={submitButtonStyle} disabled={loading}>
                  {loading ? "Submitting..." : "Submit Offer"}
                </button>
                <button type="button" onClick={onClose} style={cancelButtonStyle}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
