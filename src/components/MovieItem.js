import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./css/MovieItem.css";

const MovieItem = ({ movie }) => {
  const poster_path = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`;
  return (
    <div className="movie-item">
      <img className="movie-poster" src={poster_path} alt={movie.title} />
      <p className="movie-title">{movie.title}</p>
      <p className="movie-vote-average">
        <FontAwesomeIcon className="star-icon" icon={faStar} />
        {movie.vote_average}
      </p>
    </div>
  );
};

export default MovieItem;
