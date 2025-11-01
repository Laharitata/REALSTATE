import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    phone: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://realstate-5.onrender.com/signup", form);
      alert("Signup Successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
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
      background: "linear-gradient(45deg, #1e3c72, #2a5298)", // Dark blue gradient
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
          <h2 style={styles.title}>Create Real Estate Account 🏡</h2>
          <p style={styles.subtitle}>Sign up to manage your properties</p>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              style={styles.input}
              value={form.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              style={styles.input}
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              style={styles.input}
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              style={styles.input}
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              style={styles.input}
              value={form.phone}
              onChange={handleChange}
              required
            />
            <button style={styles.button}>Sign Up</button>
          </form>
          <p style={styles.switchText}>
            Already have an account?{" "}
            <span style={styles.switchSpan} onClick={() => navigate("/")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
