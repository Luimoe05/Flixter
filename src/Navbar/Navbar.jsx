import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar({ onDataSend, onDataClear, onSort }) {
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("default-choice");
  // const [clear, setClear] = useState(false);

  const handleSearch = () => {
    onDataSend(search);
  };

  const handleClear = () => {
    setSearch("");
    onDataSend("");
    onDataClear(true);
    setSortValue("default-choice");
    onSort("default-choice");
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSort = (e) => {
    const selectedTarget = e.target.value;
    setSortValue(selectedTarget);
    onSort(selectedTarget);
  };

  return (
    <>
      <nav>
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
              <span
                className="material-symbols-outlined"
                onClick={handleSearch}
              >
                search
              </span>
            </div>
            <button className="clear-btn" onClick={handleClear}>
              Clear
            </button>

            <select
              className="filter-menu"
              onChange={handleSort}
              value={sortValue}
            >
              <option value="default-choice">Sort By</option>
              <option value="title">Title</option>
              <option value="release-date">Release Date</option>
              <option value="vote-average">Vote Average</option>
            </select>
          </div>
        </div>
      </nav>
    </>
  );
}
