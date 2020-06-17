import React from "react";
import "./css/FeaturedMovie.css";

const FeaturedMovie = ({ featuredMovie, featuredMovieTrailer }) => {
  const backdrop_path = `https://image.tmdb.org/t/p/w780/${featuredMovie.backdrop_path}`;
  const poster_path = `https://image.tmdb.org/t/p/w500/${featuredMovie.poster_path}`;
  const featuredMovieTrailerURL = `https://www.youtube.com/embed/${featuredMovieTrailer.key}`;
  const style = {
    backgroundImage: `url(${backdrop_path})`
  };
  const stars = [];

  for (let i = 0; i < 10; i++) {
    if (
      i < featuredMovie.vote_average &&
      featuredMovie.vote_average - i < 1 &&
      featuredMovie.vote_average - i > 0
    ) {
      stars.push(<i className="star half icon" key={`star${i}`}></i>);
    } else if (
      i < featuredMovie.vote_average &&
      featuredMovie.vote_average - i > 0
    ) {
      stars.push(<i className="star icon" key={`star${i}`}></i>);
    } else {
      stars.push(<i className="star outline icon" key={`star${i}`}></i>);
    }
  }

  return (
    <div className="featured-movie">
      <div className="featured-movie-poster" style={style}></div>
      <div className="featured-movie-info">
        <h1 className="featured-movie-title">{featuredMovie.title}</h1>
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
          className="featured-movie-trailer"
          title={featuredMovieTrailer.name}
          width="100%"
          height="300px"
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
