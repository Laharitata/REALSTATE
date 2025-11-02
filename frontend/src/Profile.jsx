import React, { useEffect, useState } from "react";
import api from "./api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [contactRequests, setContactRequests] = useState([]);
  const [sellerRequests, setSellerRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPurchaseHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/purchase-history", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPurchaseHistory(res.data.purchases);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchContactRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/contact-requests", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContactRequests(res.data.contactRequests);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSellerRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/contact-requests/seller", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSellerRequests(res.data.contactRequests);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
    fetchPurchaseHistory();
    fetchContactRequests();
    fetchSellerRequests();
  }, []);

  if (!user) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading profile...</p>;

  const tabStyle = {
    padding: "10px 20px",
    margin: "0 5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold"
  };

  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: "#3498db",
    color: "#fff"
  };

  const cardStyle = {
    background: "#f9f9f9",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <h2>👤 My Profile</h2>

      {/* Tab Navigation */}
      <div style={{ marginBottom: "20px" }}>
        <button
          style={activeTab === 'profile' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          style={activeTab === 'purchases' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('purchases')}
        >
          Purchase History
        </button>
        <button
          style={activeTab === 'contactRequests' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('contactRequests')}
        >
          My Contact Requests ({contactRequests.length})
        </button>
        <button
          style={activeTab === 'sellerRequests' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('sellerRequests')}
        >
          Seller Requests ({sellerRequests.length})
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Joined:</strong> {new Date(user.joined).toLocaleDateString()}</p>
        </div>
      )}

      {/* Purchase History Tab */}
      {activeTab === 'purchases' && (
        <div>
          <h3>🛒 Purchase History</h3>
          {purchaseHistory.length === 0 ? (
            <p>No purchases yet.</p>
          ) : (
            <div>
              {purchaseHistory.map((purchase, index) => (
                <div key={index} style={cardStyle}>
                  <h4>{purchase.property.title}</h4>
                  <p><strong>Location:</strong> {purchase.property.location}</p>
                  <p><strong>Price:</strong> ₹{purchase.property.price}</p>
                  <p><strong>Purchased on:</strong> {new Date(purchase.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Contact Requests Tab */}
      {activeTab === 'contactRequests' && (
        <div>
          <h3>📞 My Contact Requests</h3>
          {contactRequests.length === 0 ? (
            <p>You haven't submitted any contact requests yet.</p>
          ) : (
            <div>
              {contactRequests.map((request, index) => (
                <div key={index} style={cardStyle}>
                  <h4>{request.property.title}</h4>
                  <p><strong>Location:</strong> {request.property.location}</p>
                  <p><strong>Price:</strong> ₹{request.property.price}</p>
                  <p><strong>Message:</strong> {request.message}</p>
                  <p><strong>Status:</strong> <span style={{
                    color: request.status === 'pending' ? '#f39c12' :
                           request.status === 'contacted' ? '#27ae60' : '#95a5a6',
                    fontWeight: 'bold'
                  }}>{request.status}</span></p>
                  <p><strong>Requested on:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Seller Requests Tab */}
      {activeTab === 'sellerRequests' && (
        <div>
          <h3>🏠 Interest in My Properties</h3>
          {sellerRequests.length === 0 ? (
            <p>No one has shown interest in your properties yet.</p>
          ) : (
            <div>
              {sellerRequests.map((request, index) => (
                <div key={index} style={cardStyle}>
                  <h4>{request.property.title}</h4>
                  <p><strong>Location:</strong> {request.property.location}</p>
                  <p><strong>Price:</strong> ₹{request.property.price}</p>
                  <p><strong>Buyer:</strong> {request.buyerName}</p>
                  <p><strong>Buyer Email:</strong> {request.buyerEmail}</p>
                  <p><strong>Buyer Phone:</strong> {request.buyerPhone}</p>
                  <p><strong>Message:</strong> {request.message}</p>
                  <p><strong>Status:</strong> <span style={{
                    color: request.status === 'pending' ? '#f39c12' :
                           request.status === 'contacted' ? '#27ae60' : '#95a5a6',
                    fontWeight: 'bold'
                  }}>{request.status}</span></p>
                  <p><strong>Requested on:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
