import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MovieItem from './MovieItem';

const Movies = styled.div`
  border-top: 1px solid #fdfdfe;
  /* keep the title clear of the fixed navbar when scrolled to after a search */
  scroll-margin-top: 65px;

  /* phones also have the search row open below the navbar */
  @media (max-width: 600px) {
    scroll-margin-top: 131px;
  }
`;

const Title = styled.h2`
  margin-top: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
`;

const Empty = styled.p`
  margin: 40px 20px;
  text-align: center;
`;

const List = styled.div`
  outline: none;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MoviesList = ({ genre, query, movies, onAddFavorite, onClickMovieItem, onHideMovie }) => {
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
    <Movies id="movies-list">
      <Title>{query ? `RESULTS FOR "${query.toUpperCase()}"` : `TRENDING ${genre ? `${genre} ` : ''}MOVIES`}</Title>
      {movies.length ? <List>{renderedList}</List> : <Empty>No movies found. Try a different search.</Empty>}
    </Movies>
  );
};

MoviesList.propTypes = {
  genre: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onClickMovieItem: PropTypes.func.isRequired,
  onHideMovie: PropTypes.func.isRequired
};

export default MoviesList;
