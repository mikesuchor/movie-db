import React from 'react';
import './css/Dropdown.css';

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
    <div className="dropdown">
      <button className="item">
        GENRES
        <i className="caret down icon"></i>
      </button>
      <ul className="dropdown-content">
        <div>
          {Object.entries(genreList).map(([genre, id], index) => {
            while (index < genreListSize / 2) {
              return (
                <li key={id} onClick={() => onSelectGenre(genre, id)}>
                  {genre}
                </li>
              );
            }
            return null;
          })}
        </div>
        <div>
          {Object.entries(genreList).map(([genre, id], index) => {
            while (index > genreListSize / 2) {
              return (
                <li key={id} onClick={() => onSelectGenre(genre, id)}>
                  {genre}
                </li>
              );
            }
            return null;
          })}
        </div>
      </ul>
    </div>
  );
};

export default Dropdown;
