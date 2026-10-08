import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FavoriteItem from './FavoriteItem';
import Row from './Row';

const Section = styled.section`
  padding: 40px var(--gutter) 8px;
`;

const SectionHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(22px, 2.6vw, 30px);
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Empty = styled.p`
  padding: 40px 0;
  color: var(--muted);
`;

// Hidden while empty, unless My List was clicked (showEmpty), so the button always has somewhere to go
const FavoritesList = ({ favorites, showEmpty, onRemoveFavorite, onClickMovieItem }) => {
  if (!favorites.length && !showEmpty) return null;

  if (!favorites.length) {
    return (
      <Section id="favorites-list">
        <SectionHead>
          <SectionTitle>My List</SectionTitle>
        </SectionHead>
        <Empty>Your list is empty. Press + on a movie to add it.</Empty>
      </Section>
    );
  }

  return (
    <Row id="favorites-list" title="My List">
      {favorites.map((movie) => (
        <FavoriteItem key={movie.id} movie={movie} onRemoveFavorite={onRemoveFavorite} onClickMovieItem={onClickMovieItem} />
      ))}
    </Row>
  );
};

FavoritesList.propTypes = {
  favorites: PropTypes.array.isRequired,
  showEmpty: PropTypes.bool.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
  onClickMovieItem: PropTypes.func.isRequired
};

export default FavoritesList;
