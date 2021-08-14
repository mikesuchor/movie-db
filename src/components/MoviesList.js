import React from 'react';
import MovieItem from './MovieItem';
import styled from 'styled-components';

const Movies = styled.div`
  border-top: 1px solid #fdfdfe;
`;

const Title = styled.h2`
  margin-top: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
`;

const List = styled.div`
  outline: none;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

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
    <Movies>
      <Title>TRENDING {genre} MOVIES</Title>
      <List>{renderedList}</List>
    </Movies>
  );
};

export default MoviesList;
