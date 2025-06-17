import React, { use, useEffect, useState } from "react";
import "./Modal.css";
import axios from "axios";

export default function Modal(movie) {
  const [runtime, setRuntime] = useState(null);
  const [genre, setGenre] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;

  const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`;
  const videosUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`;

  console.log("Modal opened");

  //render on inital mount
  useEffect(() => {
    const fetchList = async () => {
      try {
        //This fetches the data from detailsUrl
        const { data } = await axios.get(detailsUrl);
        console.log(data);
        setRuntime(data.runtime);
        setGenre(data.genres);

        const trailer = await axios.get(videosUrl);

        setTrailerKey(trailer.data.results[0].key);
      } catch (err) {
        console.log("Error caught", err);
      }
    };

    fetchList();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    //cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    movie.onClose();
    setRuntime(null);
  };

  const handleBackDropClose = (e) => {
    if (e.target === e.currentTarget) {
      movie.onClose();
      setRuntime(null);
    }
  };

  return (
    <div className="modal" onClick={handleBackDropClose}>
      <div className="modal-content">
        <div className="top-of-modal">
          <h1>{movie.title}</h1>
          <div className="close-box" onClick={handleClose}>
            <span>&times;</span>
          </div>
        </div>
        <div className="info-and-image">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.image}`}
            alt={movie.title}
            className="modal-img"
          />
          <div className="modal-info">
            <div className="additional-info">
              <p>
                <strong className="title">Release Date: </strong>
                {movie.release_date}
              </p>
              <div className="additional-info">
                <p>
                  <strong className="title">Overview: </strong>
                  {movie.overview}
                </p>
                <p>
                  <strong className="title">Runtime: </strong>
                  {runtime} minutes
                </p>

                <p>
                  <strong className="title">Genres: </strong>
                  {genre.map((genre) => genre.name).join(", ")}
                </p>

                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="description"
                  height="300"
                  width="550"
                  className="video-trailer"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
