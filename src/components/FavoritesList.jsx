import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FavoriteItem from './FavoriteItem';

const Favorites = styled.div`
  border-top: 1px solid #fdfdfe;
  background: #0d253f;
  /* keep the title clear of the fixed navbar when scrolled to from MY LIST */
  scroll-margin-top: 65px;

  /* phones may also have the search row open below the navbar */
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
  margin: 20px 20px 30px;
  text-align: center;
`;

const List = styled.div`
  outline: none;
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

// Hidden while empty, unless MY LIST was clicked (showEmpty), so the button always has somewhere to go
const FavoritesList = ({ favorites, showEmpty, onRemoveFavorite, onClickMovieItem }) => {
  if (!favorites.length && showEmpty) {
    return (
      <Favorites id="favorites-list">
        <Title>FAVORITES LIST</Title>
        <Empty>Your list is empty. Press + on a movie to add it.</Empty>
      </Favorites>
    );
  }

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
      <Favorites id="favorites-list">
        <Title>FAVORITES LIST</Title>
        <List>{renderedList}</List>
      </Favorites>
    );
  } else return null;
};

FavoritesList.propTypes = {
  favorites: PropTypes.array.isRequired,
  showEmpty: PropTypes.bool.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
  onClickMovieItem: PropTypes.func.isRequired
};

export default FavoritesList;
