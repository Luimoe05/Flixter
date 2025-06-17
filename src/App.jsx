// import "./App.css";
import { useState } from "react";
import MovieCardContainer from "./MovieCards/MovieCardContainer";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

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
      <Footer />
    </>
  );
}

export default App;
