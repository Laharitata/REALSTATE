import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login Successful");
      navigate("/buy");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Poppins', sans-serif",
      backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/005/738/391/non_2x/property-management-maintenance-and-oversight-of-real-estate-and-physical-property-photo.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    card: {
      background: "rgba(255, 255, 255, 0.98)",
      padding: "40px",
      width: "380px",
      borderRadius: "20px",
      textAlign: "center",
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)",
      animation: "fadeIn 0.7s ease",
    },
    title: {
      fontSize: "30px",
      fontWeight: "bold",
      background: "linear-gradient(45deg, #1e3c72, #2a5298)", // Dark Blue gradient
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "12px",
    },
    subtitle: { fontSize: "15px", color: "#444", marginBottom: "22px" },
    input: {
      width: "100%",
      padding: "14px",
      margin: "12px 0",
      borderRadius: "12px",
      border: "1px solid #bbb",
      outline: "none",
      fontSize: "16px",
      transition: "0.3s",
    },
    button: {
      width: "100%",
      padding: "14px",
      marginTop: "12px",
      borderRadius: "14px",
      border: "none",
      fontSize: "18px",
      cursor: "pointer",
      color: "white",
      background: "linear-gradient(45deg, #1e3c72, #2a5298)", // same as title
      transition: "transform 0.3s, box-shadow 0.3s",
    },
    switchText: { marginTop: "16px", fontSize: "14px" },
    switchSpan: { color: "#1e3c72", fontWeight: "bold", cursor: "pointer" },
  };

  return (
    <>
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          input:focus { border-color: #1e3c72; box-shadow: 0 0 10px rgba(30, 60, 114, 0.3); }
          button:hover { transform: scale(1.05); box-shadow: 0 10px 25px rgba(30, 60, 114, 0.4); }
          span:hover { text-decoration: underline; }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Real Estate Login 🏡</h2>
          <p style={styles.subtitle}>Login to manage your properties</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button style={styles.button}>Login</button>
          </form>
          <p style={styles.switchText}>
            Don't have an account?{" "}
            <span style={styles.switchSpan} onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
