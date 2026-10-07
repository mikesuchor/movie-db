import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { posterUrl, formatRating } from '../api/helpers';

const Favorite = styled.div`
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

const FavoritePoster = styled.img`
  width: 185px;
  height: 278px;

  @media (max-width: 850px) {
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
  }
`;

const FavoriteVote = styled.p`
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

const FavoriteClose = styled.button`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px;
  border: 0;
  background: none;
  cursor: pointer;

  .close {
    color: #fdfdfe;
    margin: 0;
  }

  &:hover .close {
    color: #db2828;
  }
`;

const FavoriteItem = ({ movie, onRemoveFavorite, onClickMovieItem }) => {
  const poster_path = posterUrl(movie.poster_path);
  return (
    <Favorite>
      <FavoritePoster src={poster_path} alt={movie.title} onClick={() => onClickMovieItem(movie)} />
      <FavoriteVote>
        <i className="star icon"></i>
        {formatRating(movie.vote_average)}
      </FavoriteVote>
      <FavoriteClose
        type="button"
        aria-label={`Remove ${movie.title} from favorites`}
        title="Remove from favorites"
        onClick={() => onRemoveFavorite(movie)}
      >
        <i className="close icon"></i>
      </FavoriteClose>
    </Favorite>
  );
};

FavoriteItem.propTypes = {
  movie: PropTypes.object.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
  onClickMovieItem: PropTypes.func.isRequired
};

export default FavoriteItem;
