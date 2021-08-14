import React from 'react';
import styled from 'styled-components';

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
`;

const Poster = styled.img`
  width: 185px;
  height: 278px;
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

const Favorite = styled.p`
  padding: 4px;
  display: inline-block;

  i {
    color: #eebf10;
    font-size: 40px;

    &:hover {
      color: goldenrod;
    }
  }
`;

const Hide = styled.p`
  padding: 4px;
  display: inline-block;

  i {
    color: #eebf10;
    font-size: 40px;

    &:hover {
      color: goldenrod;
    }
  }
`;

const MovieItem = ({ movie, onAddFavorite, onClickMovieItem, onHideMovie }) => {
  const poster_path = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`;

  return (
    <Movie>
      <Poster src={poster_path} alt={movie.title} onClick={() => onClickMovieItem(movie)} />
      <Rating>
        <i className="star icon"></i>
        {movie.vote_average}
      </Rating>
      <Favorite>
        <i className="plus circle icon" onClick={() => onAddFavorite(movie)}></i>
      </Favorite>
      <Hide>
        <i className="minus circle icon" onClick={() => onHideMovie(movie)}></i>
      </Hide>
    </Movie>
  );
};

export default MovieItem;
