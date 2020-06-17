import React from "react";
import Flickity from "flickity";
import MovieItem from "./MovieItem";
import "./css/MoviesList.css";

class MoviesList extends React.Component {
  componentDidMount() {
    new Flickity(".movies-list", {
      cellAlign: "left",
      contain: true
    });
  }

  render() {
    const { movies, onClickMovieItem } = this.props;

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
  }
}

export default MoviesList;
