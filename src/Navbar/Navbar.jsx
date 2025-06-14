import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="title-header">
          <h2>Flixter</h2>
        </div>
        <div className="right-side-navbar">
          <input
            type="text"
            // placeholder="Search here..."
            className="search-bar"
          />
          {/* <button className="search-btn"></button> */}
          <span className="material-symbols-outlined">search</span>
        </div>
      </div>
    </>
  );
}
