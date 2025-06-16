// import "./App.css";
import { useState } from "react";
import MovieCardContainer from "./MovieCards/MovieCardContainer";
import Navbar from "./Navbar/Navbar";

function App() {
  const [searchData, setSearchData] = useState("");
  const [clear, setClear] = useState(false);

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

  return (
    <>
      <Navbar onDataSend={handleSearchData} onDataClear={handleClear} />
      <MovieCardContainer searchData={searchData} clearData={clear} />
    </>
  );
}

export default App;
