import React from 'react';
import MovieItem from './MovieItem';
import './css/MoviesList.css';

const MoviesList = ({ genre, movies, onAddFavorite, onClickMovieItem, onHideMovie }) => {
  const renderedList = movies.map((movie) => {
    return (
      <MovieItem
        key={movie.id}
        movie={movie}
        onAddFavorite={onAddFavorite}
        onClickMovieItem={onClickMovieItem}
        onHideMovie={onHideMovie}
      />
    );
  });

  return (
    <div className="movies-section">
      <h2>TRENDING {genre} MOVIES</h2>
      <div className="movies-list">{renderedList}</div>
    </div>
  );
};

export default MoviesList;
