import React from 'react';
import FavoriteItem from './FavoriteItem';
import './css/FavoritesList.css';

const FavoritesList = ({ favorites, onRemoveFavorite, onClickMovieItem }) => {
  if (favorites != null) {
    const renderedList = favorites.map((movie) => {
      return (
        <FavoriteItem
          key={movie.id}
          movie={movie}
          onRemoveFavorite={onRemoveFavorite}
          onClickMovieItem={onClickMovieItem}
        />
      );
    });

    return (
      <div className="favorites-section">
        <h2>FAVORITES LIST</h2>
        <div className="favorites-list">{renderedList}</div>
      </div>
    );
  } else return null;
};

export default FavoritesList;
