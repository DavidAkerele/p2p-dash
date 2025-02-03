"use client";
import { useState } from "react";
import React from "react";

const Home: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const darkModeStyle: React.CSSProperties = {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    backgroundColor: isDarkMode ? "#333333" : "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease, color 0.3s ease", // Added smooth transition
  };

  const card: React.CSSProperties = {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "40px",
    maxWidth: "500px",
    width: "100%",
    backgroundColor: isDarkMode ? "#2c3e50" : "#f8f9fa", // No duplicate backgroundColor here
    color: isDarkMode ? "#ffffff" : "#000000",
    transition: "background-color 0.3s ease, color 0.3s ease", // Smooth color transition
  };

  const container: React.CSSProperties = {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: isDarkMode ? "#1a1a1a" : "#f7fafc", // No duplicate backgroundColor here
    transition: "background-color 0.3s ease", // Smooth background transition
  };

  return (
    <div
      style={container}
      className={`dashboard-container ${isDarkMode ? "dark" : ""}`}
    >
      {/* Container for the greeting */}
      <button style={darkModeStyle} onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <div style={card}>
        <h1 style={styles.heading}>Welcome to the P2P Dashboard</h1>
        <p style={styles.subHeading}>
          This is my submission for the P2P Transaction Dashboard project.
        </p>
        <p style={styles.name}>
          Developed by{" "}
          <span style={styles.nameHighlight}>Akerele David Damilola</span>
        </p>

        {/* Dashboard Button */}
        <a href="/dashboard">
          <button style={styles.button}>Go to Dashboard</button>
        </a>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 Akerele David Damilola</p>
      </footer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    transition: "color 0.3s ease", // Smooth transition for heading text color
  },
  subHeading: {
    fontSize: "1.25rem",
    marginBottom: "20px",
    transition: "color 0.3s ease", // Smooth transition for subheading text color
  },
  name: {
    fontSize: "1.25rem",
    marginBottom: "30px",
    transition: "color 0.3s ease", // Smooth transition for name text color
  },
  nameHighlight: {
    fontWeight: "bold",
    color: "#5a67d8",
  },
  button: {
    backgroundColor: "#5a67d8",
    color: "white",
    padding: "12px 24px",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s ease", // Smooth transition for button background
  },
  buttonHover: {
    backgroundColor: "#4c51bf",
  },
  footer: {
    position: "absolute",
    bottom: "0",
    textAlign: "center",
    padding: "10px",
    fontSize: "0.875rem",
    color: "#a0aec0",
    transition: "color 0.3s ease", // Smooth transition for footer text color
  },
};

export default Home;
