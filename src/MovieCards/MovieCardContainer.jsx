import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieCard.css";
import axios from "axios";

export default function MovieCardContainer({
  searchData,
  clearData,
  sortData,
}) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentSortOption, setCurrentSortOption] = useState("default-choice");

  // console.log(searchData);
  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;

  //this is working correctly
  //The data is being passed through the navbar and app to here
  console.log(sortData);

  //initial fetch list
  useEffect(() => {
    fetchList(1);
  }, []);

  //handles the searching part of the website
  useEffect(() => {
    if (searchData !== "") {
      setIsSearching(true);
      searchMovies(searchData, 1);
    } else {
      setIsSearching(false);
      setCurrentPage(1);
      fetchList(1);
    }
  }, [searchData]);

  //handles the clear data button
  useEffect(() => {
    if (clearData === true) {
      setIsSearching(false);
      setCurrentPage(1);
      fetchList(1);
    }
  }, [clearData]);

  //Handles the sort data part of the website
  useEffect(() => {
    applySort(sortData, 1);
  }, [sortData]);

  //Renders the initial set of movie
  const fetchList = async (page, sortOption) => {
    //start loading
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&page=${page}&language=en-US`
      );

      if (page === 1) {
        setMovies(helperApplySort(data.results, currentSortOption));
      } else {
        //COMBINES BUT DOES NOT SORT
        const combinedMovies = [...movies, ...data.results];
        const sortedMovies = helperApplySort(combinedMovies, currentSortOption);
        setMovies(sortedMovies);
      }
      // console.log(data.results);
    } catch (err) {
      console.error(`Error fetching: `, err);
    }

    //end loading
    setLoading(false);
  };

  //render the movies based on the search inputed
  const searchMovies = async (query, page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${query}&language=en-US&page=${page}`
      );

      console.log("Searched Movies Fetched");

      if (page === 1) {
        setMovies(helperApplySort(data.results, currentSortOption));
        setCurrentPage(1);
      } else {
        const combinedMovies = [...movies, ...data.results];
        const sortedMovies = helperApplySort(combinedMovies, currentSortOption);
        setMovies(sortedMovies);
      }
    } catch (err) {
      console.log("Caught error: ", err);
    }
    setLoading(false);
  };

  const nextPage = () => {
    const nextPageNum = currentPage + 1;
    setCurrentPage(nextPageNum);

    if (isSearching && searchData) {
      searchMovies(searchData, nextPageNum);
    } else {
      fetchList(nextPageNum);
      applySort(dropDownStatus);
    }
  };

  const applySort = (dropDownStatus) => {
    setCurrentSortOption(dropDownStatus);

    const sortedMovies = helperApplySort(movies, dropDownStatus);

    setMovies(sortedMovies);
  };

  const helperApplySort = (nonSortedArray, dropDownStatus) => {
    let sortedMovies = [...nonSortedArray];

    if (dropDownStatus === "title") {
      sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (dropDownStatus === "release-date") {
      sortedMovies.sort(
        //This is sorting the array by release dates
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    } else if (dropDownStatus === "vote-average") {
      sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
    }

    return sortedMovies;
  };

  return (
    <>
      <div className="main-container">
        {movies.map((e) => {
          return (
            <div key={e.id}>
              <MovieCard
                image={e.poster_path}
                title={e.original_title}
                average={e.vote_average}
              />
            </div>
          );
        })}
      </div>

      <div className="loadmore-container">
        <button onClick={nextPage} className="loadmore-button">
          Load More
        </button>
      </div>
    </>
  );
}
