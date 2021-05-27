import React from 'react';
import MovieItem from './MovieItem';
import './css/MoviesList.css';

class MoviesList extends React.Component {
  render() {
    let { movies, onClickMovieItem, genre } = this.props;

    const renderedList = movies.map((movie) => {
      return <MovieItem key={movie.id} movie={movie} onClickMovieItem={onClickMovieItem} />;
    });

    return (
      <div className="movies-section">
        <h2>TRENDING {genre} MOVIES</h2>
        <div className="movies-list">{renderedList}</div>
      </div>
    );
  }
}

export default MoviesList;
