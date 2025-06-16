import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar({ onDataSend, onDataClear }) {
  const [search, setSearch] = useState("");
  const [clear, setClear] = useState(false);

  const handleSearch = () => {
    onDataSend(search);
  };

  const handleClear = () => {
    setSearch("");
    onDataSend("");
    onDataClear(true);

    // document.querySelector(".search-bar").value = "";
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="title-header">
          <h2>Flixter</h2>
        </div>
        <div className="right-side-navbar">
          <div className="search-side-navbar">
            <input
              type="text"
              // placeholder="Search here..."
              value={search}
              className="search-bar"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleEnterKey}
            />
            {/* <button className="search-btn"></button> */}
            <span className="material-symbols-outlined" onClick={handleSearch}>
              search
            </span>
          </div>
          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </>
  );
}
