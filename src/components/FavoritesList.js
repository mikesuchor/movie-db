import React from 'react';
import FavoriteItem from './FavoriteItem';
import styled from 'styled-components';

const Favorites = styled.div`
  border-top: 1px solid #fdfdfe;
  background: #0d253f;
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
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const FavoritesList = ({ favorites, onRemoveFavorite, onClickMovieItem }) => {
  if (favorites && favorites.length) {
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
      <Favorites>
        <Title>FAVORITES LIST</Title>
        <List>{renderedList}</List>
      </Favorites>
    );
  } else return null;
};

export default FavoritesList;
