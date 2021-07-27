import React from 'react';
import HiddenItem from './HiddenItem';
import './css/HiddenList.css';

const HiddenList = ({ hidden, onClickMovieItem }) => {
  if (hidden.length) {
    const renderedList = hidden.map((movie) => {
      return <HiddenItem key={movie.id} movie={movie} onClickMovieItem={onClickMovieItem} />;
    });

    return (
      <div className="hidden-section">
        <h2>HIDDEN LIST</h2>
        <div className="hidden-list">{renderedList}</div>
      </div>
    );
  } else return null;
};

export default HiddenList;
