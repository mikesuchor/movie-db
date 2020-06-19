import React from "react";
import "./css/MovieItem.css";

const MovieItem = ({ movie, onClickMovieItem }) => {
  const poster_path = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`;
  return (
    <div className="movie-item swiper-slide">
      <img
        className="movie-poster"
        src={poster_path}
        alt={movie.title}
        onClick={() => onClickMovieItem(movie)}
      />
      <p className="movie-title">{movie.title}</p>
      <p className="movie-vote-average">
        <i className="star icon"></i>
        {movie.vote_average}
      </p>
    </div>
  );
};

export default MovieItem;
