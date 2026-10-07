import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { posterUrl, formatRating } from '../api/helpers';

const Movie = styled.div`
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
    height: auto;
    aspect-ratio: 2 / 3;
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

const ActionButton = styled.button`
  padding: 4px;
  border: 0;
  background: none;
  cursor: pointer;

  i {
    color: #eebf10;
    font-size: 40px;
    margin: 0;
  }

  &:hover i {
    color: goldenrod;
  }
`;

const MovieItem = ({ movie, onAddFavorite, onClickMovieItem, onHideMovie }) => {
  const poster_path = posterUrl(movie.poster_path);

  return (
    <Movie>
      <Poster src={poster_path} alt={movie.title} onClick={() => onClickMovieItem(movie)} />
      <Rating>
        <i className="star icon"></i>
        {formatRating(movie.vote_average)}
      </Rating>
      <ActionButton
        type="button"
        aria-label={`Add ${movie.title} to favorites`}
        title="Add to favorites"
        onClick={() => onAddFavorite(movie)}
      >
        <i className="plus circle icon"></i>
      </ActionButton>
      <ActionButton
        type="button"
        aria-label={`Hide ${movie.title}`}
        title="Hide movie"
        onClick={() => onHideMovie(movie)}
      >
        <i className="minus circle icon"></i>
      </ActionButton>
    </Movie>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onClickMovieItem: PropTypes.func.isRequired,
  onHideMovie: PropTypes.func.isRequired
};

export default MovieItem;
