import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Hidden = styled.div`
  position: relative;
  width: 200px;
  text-align: center;
  padding: 8px;
  background: #000000;
  margin: 0 10px 20px;

  &:hover {
    background: #22848d;
    cursor: pointer;
  }

  @media (max-width: 850px) {
    width: 150px;
  }
`;

const Poster = styled.img`
  width: 185px;
  height: 278px;

  @media (max-width: 850px) {
    width: 100%;
    height: 100%;
  }
`;

const Rating = styled.p`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 3px;

  .star {
    font-size: 12px;
    color: #eebf10;
    margin-right: 6px;
  }
`;

const HiddenItem = ({ movie, onClickMovieItem }) => {
  const poster_path = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`;
  return (
    <Hidden>
      <Poster className="hidden-poster" src={poster_path} alt={movie.title} onClick={() => onClickMovieItem(movie)} />
      <Rating>
        <i className="star icon"></i>
        {movie.vote_average}
      </Rating>
    </Hidden>
  );
};

HiddenItem.propTypes = {
  movie: PropTypes.object.isRequired,
  onClickMovieItem: PropTypes.func.isRequired
};

export default HiddenItem;
