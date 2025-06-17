import React, { use, useState } from "react";
import "./MovieCard.css";
export default function MovieCard(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [heartStatus, setHeartStatus] = useState("heart-notFilled");

  const [isWatched, setIsWatched] = useState(false);
  const [watchedStatus, setWatchedStatus] = useState("not-watched");

  const openModal = () => {
    props.onCardClick(props.movieData);
    // console.log(props.movieData);
  };

  const handleLike = () => {
    //if isLiked is false, meaning that the button is not liked
    if (!isLiked) {
      //set isLiked to true, as the tile is now liked
      setIsLiked(true);
      setHeartStatus("heart-filled");
    } else {
      //this means that isLiked was true, and therefore we have unliked the tile
      setIsLiked(false);
      setHeartStatus("heart-notFilled");
    }
  };

  const handleWatched = () => {
    if (!isWatched) {
      setIsWatched(true);
      setWatchedStatus("watched");
    } else {
      setIsWatched(false);
      setWatchedStatus("not-watched");
    }
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
            <p className="movie-average">&#9733; {props.average.toFixed(1)} </p>
          </div>
          <div className="movie-card-logos">
            <span
              className={heartStatus}
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
            >
              favorite
            </span>
            <span
              className={watchedStatus}
              onClick={(e) => {
                e.stopPropagation();
                handleWatched();
              }}
            >
              visibility
            </span>
          </div>
        </div>
      </article>
    </>
  );
}
