import React from "react";
import "../styles/header.css";
import Link from "react-router-dom";

const Header = () => {
  return (
    <nav className="navber navbar-dark bg-primary navbar-expand-lg customizeNav py-2">
      <div className="d-flex justify-content-between align-items-center">
        <div className="brandFlex">
          <a href="#">
            <div className="circleImg"></div>
            <h2>Inventory Management System</h2>
          </a>
        </div>
        <a href="#" className="text-white" 
            style={{textDecoration:"none"}}
        >
          Home
        </a>
      </div>
    </nav>
  );
};

export default Header;
