import React from "react";
import MovieItem from "./MovieItem";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import "./css/MoviesList.css";

class MoviesList extends React.Component {
  componentDidMount() {
    new Swiper(".swiper-container", {
      slidesPerView: "auto",
      grabCursor: true,
      loop: true
    });
  }

  render() {
    let { movies, onClickMovieItem } = this.props;

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
        <div className="movies-list swiper-container">
          <div className="swiper-wrapper">{renderedList}</div>
        </div>
      </div>
    );
  }
}

export default MoviesList;
