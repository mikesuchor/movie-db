import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Item = styled.li`
  padding: 12px;
  display: block;
  background: #144b5c;
  color: #fdfdfe;
  width: 200px;
`;

const List = styled.div`
  position: absolute;
  display: none;
  height: 422px;
  background: #144b5c;
  border: 1px solid #fdfdfe;

  ${Item}:hover {
    background: #22848d;
    cursor: pointer;
  }
`;

const Menu = styled.div`
  position: relative;

  &:hover ${List} {
    display: flex;
  }

  .item:hover {
    color: #fdfdfe;
    background: #22848d;
  }
`;

const Dropdown = ({ onSelectGenre }) => {
  const genreList = {
    ACTION: 28,
    ADVENTURE: 12,
    ANIMATION: 16,
    COMEDY: 35,
    CRIME: 80,
    DOCUMENTARY: 99,
    DRAMA: 18,
    FAMILY: 10751,
    FANTASY: 14,
    HISTORY: 36,
    HORROR: 27,
    MUSIC: 10402,
    MYSTERY: 9648,
    ROMANCE: 10749,
    'SCIENCE FICTION': 878,
    'TV MOVIE': 10770,
    THRILLER: 53,
    WAR: 10752,
    WESTERN: 37
  };
  const genreListSize = Object.keys(genreList).length;
  return (
    <Menu>
      <button className="item">
        GENRES
        <i className="caret down icon"></i>
      </button>
      <List>
        <div>
          {Object.entries(genreList).map(([genre, id], index) => {
            while (index < genreListSize / 2) {
              return (
                <Item key={id} onClick={() => onSelectGenre(genre, id)}>
                  {genre}
                </Item>
              );
            }
            return null;
          })}
        </div>
        <div>
          {Object.entries(genreList).map(([genre, id], index) => {
            while (index > genreListSize / 2) {
              return (
                <Item key={id} onClick={() => onSelectGenre(genre, id)}>
                  {genre}
                </Item>
              );
            }
            return null;
          })}
        </div>
      </List>
    </Menu>
  );
};

Dropdown.propTypes = {
  onSelectGenre: PropTypes.func.isRequired
};

export default Dropdown;
