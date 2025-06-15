import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar({ onDataSend }) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onDataSend(search);
  };

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
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <button className="search-btn"></button> */}
          <span className="material-symbols-outlined" onClick={handleSearch}>
            search
          </span>
          {/* <button>Clear</button> */}
        </div>
      </div>
    </>
  );
}
