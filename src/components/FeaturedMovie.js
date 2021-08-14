import React from 'react';
import styled from 'styled-components';

const Movie = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 15px;
  padding: 30px 0;
`;

const Info = styled.div`
  margin: auto;
  padding: 25px 100px;
  min-width: 800px;
  width: 62%;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.9);
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 46px;
`;

const Overview = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  font-size: 16px;
`;

const Rating = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  margin: 15px 0 20px;

  .star {
    color: #eebf10;
    font-size: 20px;
  }
`;

const Trailer = styled.iframe`
  margin: auto;
`;

// Blank movie trailer as default for movies which don't have trailers
const FeaturedMovie = ({ featuredMovie, featuredMovieTrailer = 'jBa_aHwCbC4' }) => {
  const backdrop_path = `https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path}`;
  const featuredMovieTrailerURL = `https://www.youtube.com/embed/${featuredMovieTrailer.key}`;
  const stars = [];

  for (let i = 0; i < 10; i++) {
    if (i < featuredMovie.vote_average && featuredMovie.vote_average - i < 1 && featuredMovie.vote_average - i > 0) {
      stars.push(<i className="star half icon" key={`star${i}`}></i>);
    } else if (i < featuredMovie.vote_average && featuredMovie.vote_average - i > 0) {
      stars.push(<i className="star icon" key={`star${i}`}></i>);
    }
  }

  return (
    <Movie style={{ backgroundImage: `url(${backdrop_path})` }}>
      <Info>
        <Title>{featuredMovie.title}</Title>
        <Overview>{featuredMovie.overview}</Overview>
        <Rating>
          {stars}
          <span className="featured-movie-average">{featuredMovie.vote_average}</span>
        </Rating>
        <Trailer
          className="featured-movie-trailer"
          title={featuredMovieTrailer.name}
          width="100%"
          height="450px"
          src={featuredMovieTrailerURL}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Info>
    </Movie>
  );
};

export default FeaturedMovie;
