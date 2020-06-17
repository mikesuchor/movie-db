import React from "react";
import MovieItem from "./MovieItem";
import "./css/MoviesList.css";

const MoviesList = ({ movies, onClickMovieItem }) => {
  const renderedList = movies.map((movie) => {
    return (
      <MovieItem
        key={movie.id}
        movie={movie}
        onClickMovieItem={onClickMovieItem}
      />
    );
  });
  return (
    <div className="movies-section">
      <h2>TRENDING MOVIES</h2>
      <div className="movies-list">{renderedList}</div>
    </div>
  );
};

export default MoviesList;
