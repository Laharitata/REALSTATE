import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT token
    navigate("/"); // redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        fontSize: "16px",
        background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "0.3s",
      }}
    >
      Logout
    </button>
  );
}