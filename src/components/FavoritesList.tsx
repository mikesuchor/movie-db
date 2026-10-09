import React from 'react';
import styled from 'styled-components';
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

// Hidden while empty, unless Favorites was clicked (showEmpty), so the button always has somewhere to go
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  popularity?: number;
}

interface FavoritesListProps {
  favorites: Movie[];
  showEmpty: boolean;
  onRemoveFavorite: (movie: Movie) => void;
  onClickMovieItem: (movie: Movie) => void;
}

const FavoritesList = ({
  favorites,
  showEmpty,
  onRemoveFavorite,
  onClickMovieItem,
}: FavoritesListProps) => {
  if (!favorites.length && !showEmpty) return null;

  if (!favorites.length) {
    return (
      <Section id="favorites-list">
        <SectionHead>
          <SectionTitle>Favorites</SectionTitle>
        </SectionHead>
        <Empty>You have no favorites yet. Press + on a movie to add one.</Empty>
      </Section>
    );
  }

  return (
    <Row id="favorites-list" title="Favorites">
      {favorites.map((movie) => (
        <FavoriteItem
          key={movie.id}
          movie={movie}
          onRemoveFavorite={onRemoveFavorite}
          onClickMovieItem={onClickMovieItem}
        />
      ))}
    </Row>
  );
};

export default FavoritesList;
