import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://realstate-1f928m2sl-laharis-projects-185ef7fa.vercel.app/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPurchaseHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://realstate-1f928m2sl-laharis-projects-185ef7fa.vercel.app/api/purchase-history", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPurchaseHistory(res.data.purchases);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
    fetchPurchaseHistory();
  }, []);

  if (!user) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading profile...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <h2>👤 My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Joined:</strong> {new Date(user.joined).toLocaleDateString()}</p>

      <h3>Purchase History</h3>
      {purchaseHistory.length === 0 ? (
        <p>No purchases yet.</p>
      ) : (
        <div>
          {purchaseHistory.map((purchase, index) => (
            <div key={index} style={{ background: "#f9f9f9", padding: "15px", marginBottom: "10px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h4>{purchase.property.title}</h4>
              <p><strong>Location:</strong> {purchase.property.location}</p>
              <p><strong>Price:</strong> ₹{purchase.property.price}</p>
              <p><strong>Purchased on:</strong> {new Date(purchase.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
