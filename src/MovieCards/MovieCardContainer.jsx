import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieCard.css";
import axios from "axios";

export default function MovieCardContainer() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchList(currentPage);
  }, []);

  const fetchList = async (page) => {
    console.log("Ran x", currentPage);
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

  const nextPage = () => {
    const nextPageNum = currentPage + 1;
    setCurrentPage(nextPageNum);
    fetchList(nextPageNum);
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
