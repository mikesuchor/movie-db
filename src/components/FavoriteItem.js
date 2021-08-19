import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
`;

const FavoritePoster = styled.img`
  width: 185px;
  height: 278px;
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

const FavoriteClose = styled.p`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px;

  .close {
    color: #fdfdfe;

    &:hover {
      cursor: pointer;
      color: #aaaaaa;
    }
  }
`;

const FavoriteItem = ({ movie, onRemoveFavorite, onClickMovieItem }) => {
  const poster_path = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`;
  return (
    <Favorite>
      <FavoritePoster src={poster_path} alt={movie.title} onClick={() => onClickMovieItem(movie)} />
      <FavoriteVote>
        <i className="star icon"></i>
        {movie.vote_average}
      </FavoriteVote>
      <FavoriteClose>
        <i className="close icon" onClick={() => onRemoveFavorite(movie)}></i>
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
