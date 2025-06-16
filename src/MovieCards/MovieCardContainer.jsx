import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieCard.css";
import axios from "axios";

export default function MovieCardContainer({ searchData, clearData }) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // console.log(searchData);
  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;

  //initial fetch list
  useEffect(() => {
    fetchList(1);
  }, []);

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

  useEffect(() => {
    if (clearData === true) {
      setIsSearching(false);
      setCurrentPage(1);
      fetchList(1);
    }
  }, [clearData]);

  //Renders the initial set of movie
  const fetchList = async (page) => {
    //start loading
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&page=${page}&language=en-US`
      );

      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((currMovies) => [...currMovies, ...data.results]);
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
        setMovies(data.results);
        setCurrentPage(1);
      } else {
        setMovies((currentMovies) => [...currentMovies, ...data.results]);
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
    }
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
