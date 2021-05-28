import React from 'react';
import './css/MovieItem.css';

const MovieItem = ({ movie, onAddFavorite, onClickMovieItem }) => {
  const poster_path = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`;
  return (
    <div className="movie-item">
      <img className="movie-poster" src={poster_path} alt={movie.title} onClick={() => onClickMovieItem(movie)} />
      <p className="movie-vote-average">
        <i className="star icon"></i>
        {movie.vote_average}
      </p>
      <p className="movie-favorite">
        <i className="heart icon" onClick={() => onAddFavorite(movie)}></i>
      </p>
    </div>
  );
};

export default MovieItem;
