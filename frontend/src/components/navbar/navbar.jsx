import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div 
      style={{ 
        width: "100%", // Full width
        position: "fixed", // Fixed at the top
        top: 0,
        left: 0,
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "15px 30px", 
        backgroundColor: "#333", 
        color: "white",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
        zIndex: 1000, // Ensures it stays above other content
      }}
    >
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        React Router
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={styles.link}>
           Home
        </Link>
        <Link to="/about" style={styles.link}>
          About Us
        </Link>
        <Link to="/form" style={styles.link}>
          Form
        </Link>
        
      </div>
    </div>
  );
}

const styles = {
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 10px",
    transition: "color 0.3s",
  },
};

export default NavBar;
