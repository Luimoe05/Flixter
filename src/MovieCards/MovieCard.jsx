import React from "react";
import "./MovieCard.css";
export default function MovieCard(props) {
  return (
    <>
      <div className="movie-card">
        {/* THIS WILL INCLUDE THE MOVIE TITLE, POSTER IMAGE, VOTE AVERAGE */}
        <img
          className="movie-picture"
          src={`https://image.tmdb.org/t/p/w200${props.image}`}
          alt="Movie Picture"
        />
        <div className="movie-info">
          <h2 className="movie-title">{props.title}</h2>
          <p className="movie-average">{props.average}</p>
        </div>
      </div>
    </>
  );
}
