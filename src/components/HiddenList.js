import React from 'react';
import HiddenItem from './HiddenItem';
import './css/HiddenList.css';

const HiddenList = ({ hiddenList, onClickMovieItem }) => {
  const [hidden, setHidden] = React.useState(false);

  if (hiddenList && hiddenList.length) {
    const renderedList = hiddenList.map((movie) => {
      return <HiddenItem key={movie.id} movie={movie} onClickMovieItem={onClickMovieItem} />;
    });

    return (
      <div className="hidden-section">
        <h2>HIDDEN LIST</h2>
        <i className="caret down icon" onClick={() => setHidden(!hidden)}></i>
        {hidden ? <div className="hidden-list">{renderedList}</div> : null}
      </div>
    );
  } else return null;
};

export default HiddenList;
