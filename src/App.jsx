// import "./App.css";
import { useState } from "react";
import MovieCardContainer from "./MovieCards/MovieCardContainer";
import Navbar from "./Navbar/Navbar";

function App() {
  const [searchData, setSearchData] = useState("");
  const [clear, setClear] = useState(false);
  const [dropDown, setDropDown] = useState("default-choice");

  const handleSearchData = (data) => {
    console.log("handle search ran");
    setClear(false);
    setSearchData(data);
  };

  const handleClear = (data) => {
    console.log("clear ran");
    setSearchData("");
    setClear(true);

    setTimeout(() => {
      setClear(false);
    }, 100);
  };

  const handleSort = (value) => {
    if (value === "title") {
      // console.log("This is the title option");
    } else if (value === "release-date") {
      // console.log("This is the release data option");
    } else if (value === "vote-average") {
      // console.log("This is the vote average option");
    }
    setDropDown(value);
  };

  return (
    <>
      <Navbar
        onDataSend={handleSearchData}
        onDataClear={handleClear}
        onSort={handleSort}
      />
      <MovieCardContainer
        searchData={searchData}
        clearData={clear}
        sortData={dropDown}
      />
    </>
  );
}

export default App;
