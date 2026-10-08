import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const GENRES = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  'Science Fiction': 878,
  'TV Movie': 10770,
  Thriller: 53,
  War: 10752,
  Western: 37
};

const Chips = styled.div`
  display: flex;
  gap: 8px;
  margin: 0 calc(var(--gutter) * -1) 24px;
  padding: 2px var(--gutter);
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Chip = styled.button`
  flex: none;
  height: 36px;
  padding: 0 16px;
  border: 1px solid ${(props) => (props.$on ? 'var(--gold)' : 'var(--border)')};
  border-radius: 999px;
  background: ${(props) => (props.$on ? 'var(--gold)' : 'var(--surface)')};
  color: ${(props) => (props.$on ? '#000' : 'var(--muted)')};
  font-size: 14px;
  font-weight: ${(props) => (props.$on ? 600 : 500)};
  transition: color 0.2s, border-color 0.2s, background 0.2s;

  &:hover {
    ${(props) => !props.$on && 'color: var(--text); border-color: #3a3f4a;'}
  }
`;

const GenreChips = ({ genre, onSelectGenre, onClear }) => (
  <Chips role="group" aria-label="Genres">
    <Chip type="button" $on={!genre} aria-pressed={!genre} onClick={onClear}>
      All
    </Chip>
    {Object.entries(GENRES).map(([name, id]) => (
      <Chip key={id} type="button" $on={genre === name} aria-pressed={genre === name} onClick={() => onSelectGenre(name, id)}>
        {name}
      </Chip>
    ))}
  </Chips>
);

GenreChips.propTypes = {
  genre: PropTypes.string.isRequired,
  onSelectGenre: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
};

export default GenreChips;
