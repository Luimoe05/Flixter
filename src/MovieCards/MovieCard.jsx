import React from "react";
import "./MovieCard.css";
export default function MovieCard(props) {
  const openModal = () => {
    props.onCardClick(props.movieData);
    // console.log(props.movieData);
  };
  return (
    <>
      <article>
        <div className="movie-card" onClick={openModal}>
          {/* THIS WILL INCLUDE THE MOVIE TITLE, POSTER IMAGE, VOTE AVERAGE */}
          <img
            className="movie-picture"
            src={`https://image.tmdb.org/t/p/original${props.image}`}
            alt={props.title}
          />
          <div className="movie-info">
            <h2 className="movie-title">{props.title}</h2>
            <p className="movie-average">{props.average.toFixed(1)}</p>
          </div>
        </div>
      </article>
    </>
  );
}
