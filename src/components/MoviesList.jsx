import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

const MoviesList = ({ genre, query, movies, onSelectGenre, onClearGenre, onAddFavorite, onClickMovieItem, onHideMovie }) => {
  return (
    <Section id="movies-list">
      <SectionHead>
        <SectionTitle>{query ? `Results for “${query}”` : `Trending${genre ? ` ${genre}` : ''}`}</SectionTitle>
      </SectionHead>
      {!query && <GenreChips genre={genre} onSelectGenre={onSelectGenre} onClear={onClearGenre} />}
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

MoviesList.propTypes = {
  genre: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  onSelectGenre: PropTypes.func.isRequired,
  onClearGenre: PropTypes.func.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onClickMovieItem: PropTypes.func.isRequired,
  onHideMovie: PropTypes.func.isRequired
};

export default MoviesList;
