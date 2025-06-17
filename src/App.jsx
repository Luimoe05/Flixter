// import "./App.css";
import { useState } from "react";
import MovieCardContainer from "./MovieCards/MovieCardContainer";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Animation from "./mainAnimation/Animation";
import "./App.css";

function App() {
  const [searchData, setSearchData] = useState("");
  const [clear, setClear] = useState(false);
  const [dropDown, setDropDown] = useState("default-choice");
  const [carousel, setCarousel] = useState(true);

  const handleSearchData = (data) => {
    console.log("handle search ran");
    setClear(false);
    setSearchData(data);

    //IF SEARCH IS RAN
    if (data !== "") setCarousel(false);
  };

  const handleClear = (data) => {
    console.log("clear ran");
    setSearchData("");
    setClear(true);

    setTimeout(() => {
      setClear(false);
    }, 100);
    //IF CLEAR IS RAN
    setCarousel(true);
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

      <div className="main-content-container">
        {carousel && <Animation />}
        <MovieCardContainer
          searchData={searchData}
          clearData={clear}
          sortData={dropDown}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
