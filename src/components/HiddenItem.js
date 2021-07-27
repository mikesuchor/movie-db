import React from 'react';
import './css/HiddenItem.css';

const HiddenItem = ({ movie, onClickMovieItem }) => {
  const poster_path = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`;
  return (
    <div className="hidden-item">
      <img className="hidden-poster" src={poster_path} alt={movie.title} onClick={() => onClickMovieItem(movie)} />
      <p className="hidden-vote-average">
        <i className="star icon"></i>
        {movie.vote_average}
      </p>
    </div>
  );
};

export default HiddenItem;
