import React from 'react';
import './css/FavoriteItem.css';

const FavoriteItem = ({ movie, onRemoveFavorite, onClickMovieItem }) => {
  const poster_path = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`;
  return (
    <div className="favorite-item">
      <img className="favorite-poster" src={poster_path} alt={movie.title} onClick={() => onClickMovieItem(movie)} />
      <p className="favorite-vote-average">
        <i className="star icon"></i>
        {movie.vote_average}
      </p>
      <p className="favorite-heart">
        <i className="heart icon" onClick={() => onRemoveFavorite(movie)}></i>
      </p>
    </div>
  );
};

export default FavoriteItem;
