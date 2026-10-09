import React from 'react';
import styled from 'styled-components';
import MovieItem from './MovieItem';
import GenreChips from './GenreChips';

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px 16px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 12px;
  }
`;

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

interface MoviesListProps {
  genre: string;
  query: string;
  movies: Movie[];
  onSelectGenre: (genre: string, id: number) => void;
  onClearGenre: () => void;
  onAddFavorite: (movie: Movie) => void;
  onClickMovieItem: (movie: Movie) => void;
  onHideMovie: (movie: Movie) => void;
}

const MoviesList = ({
  genre,
  query,
  movies,
  onSelectGenre,
  onClearGenre,
  onAddFavorite,
  onClickMovieItem,
  onHideMovie,
}: MoviesListProps) => {
  return (
    <Section id="movies-list">
      <SectionHead>
        <SectionTitle>
          {query
            ? `Results for “${query}”`
            : genre
              ? `Popular ${genre}`
              : 'Trending'}
        </SectionTitle>
      </SectionHead>
      {!query && (
        <GenreChips
          genre={genre}
          onSelectGenre={onSelectGenre}
          onClear={onClearGenre}
        />
      )}
      {movies.length ? (
        <Grid>
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onAddFavorite={onAddFavorite}
              onClickMovieItem={onClickMovieItem}
              onHideMovie={onHideMovie}
            />
          ))}
        </Grid>
      ) : (
        <Empty>No movies found. Try a different search.</Empty>
      )}
    </Section>
  );
};

export default MoviesList;
