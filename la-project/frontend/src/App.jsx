import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Buy from "./Buy";
import Sell from "./Sell";
import Wishlist from "./Wishlist";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import "./index.css";

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // check for token
  if (!token) {
    return <Navigate to="/" replace />; // redirect to login if not authenticated
  }
  return children;
}

// Layout wrapper to include fixed Navbar
function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      {/* Add padding top equal to navbar height so content doesn't go under navbar */}
      <div style={{ paddingTop: "70px" }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes with DashboardLayout */}
        <Route
          path="/buy"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Buy />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sell"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Sell />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Wishlist />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
