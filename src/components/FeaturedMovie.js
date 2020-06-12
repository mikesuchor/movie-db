import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faSolidStar,
  faStarHalfAlt
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import "./css/FeaturedMovie.css";

const FeaturedMovie = ({ featuredMovie, featuredMovieTrailer }) => {
  const poster_path = `https://image.tmdb.org/t/p/w500/${featuredMovie.poster_path}`;
  const featuredMovieTrailerURL = `https://www.youtube.com/embed/${featuredMovieTrailer.key}`;
  const style = {
    backgroundImage: `url(${poster_path})`
  };
  const stars = [];

  for (let i = 0; i < 10; i++) {
    if (
      i < featuredMovie.vote_average &&
      featuredMovie.vote_average - i < 1 &&
      featuredMovie.vote_average - i > 0
    ) {
      stars.push(
        <FontAwesomeIcon
          className="star"
          key={`star${i}`}
          icon={faStarHalfAlt}
        />
      );
    } else if (
      i < featuredMovie.vote_average &&
      featuredMovie.vote_average - i > 0
    ) {
      stars.push(
        <FontAwesomeIcon className="star" key={`star${i}`} icon={faSolidStar} />
      );
    } else {
      stars.push(
        <FontAwesomeIcon className="star" key={`star${i}`} icon={faEmptyStar} />
      );
    }
  }

  return (
    <div className="featured-movie">
      <div className="featured-movie-poster" style={style}></div>
      <div className="featured-movie-info">
        <h1 className="featured-movie-title">{featuredMovie.title}</h1>
        <h2 className="featured-movie-tagline">{featuredMovie.tagline}</h2>
        <p className="featured-movie-overview">{featuredMovie.overview}</p>
        <div className="featured-movie-rating">
          <p className="stars">
            {stars}
            <span className="featured-movie-average">
              {featuredMovie.vote_average}
            </span>
          </p>
        </div>
        <iframe
          title={featuredMovieTrailer.name}
          width="100%"
          height="100%"
          src={featuredMovieTrailerURL}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default FeaturedMovie;
