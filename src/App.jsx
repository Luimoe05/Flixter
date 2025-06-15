// import "./App.css";
import { use, useState } from "react";
import MovieCardContainer from "./MovieCards/MovieCardContainer";
import Navbar from "./Navbar/Navbar";

function App() {
  const [searchData, setSearchData] = useState("");

  const handleSearchData = (data) => {
    setSearchData(data);
  };

  return (
    <>
      <Navbar onDataSend={handleSearchData} />
      <MovieCardContainer searchData={searchData} />
    </>
  );
}

export default App;
