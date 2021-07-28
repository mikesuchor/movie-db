import React from 'react';
import NavBar from './NavBar';
import FeaturedMovie from './FeaturedMovie';
import MoviesList from './MoviesList';
import FavoritesList from './FavoritesList';
import HiddenList from './HiddenList';
import Footer from './Footer';
import tmdb from '../api/tmdb';
import './css/App.css';

class App extends React.Component {
  state = {
    dataLoaded: false,
    movies: [],
    favorites: [],
    hidden: [],
    featuredMovie: '',
    featuredMovieTrailer: '',
    genre: ''
  };

  getMovies = async (action, query = '', with_genres = '') => {
    const movies = await tmdb.get(`/3/${action}/movie`, {
      params: {
        api_key: '1155f6c239cb4332df695fcf245eaffd',
        include_adult: false,
        include_video: false,
        query,
        'vote_count.gte': 100,
        with_genres
      }
    });
    const movies2 = await tmdb.get(`/3/${action}/movie`, {
      params: {
        api_key: '1155f6c239cb4332df695fcf245eaffd',
        include_adult: false,
        include_video: false,
        query,
        'vote_count.gte': 100,
        with_genres,
        page: 2
      }
    });
    const featuredMovieTrailer = await this.getTrailer(movies.data.results[0].id);

    const fetchedMovies = [...movies.data.results, ...movies2.data.results];

    const filteredMovies = this.compareHiddenMovies(this.state.hidden, fetchedMovies);

    this.setState({
      dataLoaded: true,
      movies: filteredMovies ? filteredMovies : fetchedMovies,
      featuredMovie: movies.data.results[0],
      featuredMovieTrailer: featuredMovieTrailer.data.results[0]
    });
  };

  getTrailer = async (movie) => {
    return tmdb.get(`/3/movie/${movie}/videos`, {
      params: {
        api_key: '1155f6c239cb4332df695fcf245eaffd'
      }
    });
  };

  // When App component mounts, get movie data from tmdb using "discover" action and get favorites from local storage
  componentDidMount() {
    this.getMovies('discover');
    const favorites = JSON.parse(localStorage.getItem('movie-database-favorites'));
    const hidden = JSON.parse(localStorage.getItem('movie-database-hidden'));
    if (favorites) {
      this.setState({
        favorites,
        hidden
      });
    }
  }

  saveToLocalStorage = (type, movies) => {
    localStorage.setItem(`movie-database-${type}`, JSON.stringify(movies));
  };

  // When a genre is selected, get movie data
  onSelectGenre = (genre, id) => {
    this.getMovies('discover', '', id);
    this.setState({
      genre
    });
  };

  // When SearchBar component is submitted, get movie data from tmdb using "search" action and input query and store it in state
  onSearchSubmit = (input) => {
    this.getMovies('search', input);
  };

  // When the add favorite button is clicked, checks for duplicates then add to the favorite list and to local storage
  onAddFavorite = (movie) => {
    if (!this.state.favorites.some((favorite) => favorite.id === movie.id)) {
      const newFavoritesList = [...this.state.favorites, movie];
      this.setState({
        favorites: newFavoritesList
      });
      this.saveToLocalStorage('favorites', newFavoritesList);
    }
  };

  // When the remove favorite button is clicked, checks the favorites list for the movie then remove from the favorite list and from local storage
  onRemoveFavorite = (movie) => {
    const newFavoritesList = this.state.favorites.filter((favorite) => {
      return favorite.id !== movie.id;
    });
    this.setState({
      favorites: newFavoritesList
    });
    this.saveToLocalStorage('favorites', newFavoritesList);
  };

  // When a Movie is clicked update the featured movie with the movie data and trailer
  onClickMovieItem = async (movie) => {
    const clickedMovieTrailer = await this.getTrailer(movie.id);
    this.setState({
      featuredMovie: movie,
      featuredMovieTrailer: clickedMovieTrailer.data.results[0]
    });
    window.scrollTo(0, 0);
  };

  onHideMovie = (movie) => {
    if (!this.state.hidden.some((hidden) => hidden.id === movie.id)) {
      const newHiddenList = [...this.state.hidden, movie];
      this.setState({
        hidden: newHiddenList
      });
      this.saveToLocalStorage('hidden', newHiddenList);
    }
  };

  compareHiddenMovies = (hiddenMovies, moviesList) => {
    if (this.state.hidden.length) {
      const hiddenMovieIDs = hiddenMovies.map(function (a) {
        return a.id;
      });

      return moviesList.filter(function (a) {
        return hiddenMovieIDs.indexOf(a.id) === -1;
      });
    }
  };

  render() {
    if (this.state.dataLoaded) {
      return (
        <div>
          <NavBar onSelectGenre={this.onSelectGenre} onSearchSubmit={this.onSearchSubmit} />
          <FeaturedMovie
            featuredMovie={this.state.featuredMovie}
            featuredMovieTrailer={this.state.featuredMovieTrailer}
          />
          <FavoritesList
            favorites={this.state.favorites}
            onAddFavorite={this.onAddFavorite}
            onRemoveFavorite={this.onRemoveFavorite}
            onClickMovieItem={this.onClickMovieItem}
          />
          <MoviesList
            genre={this.state.genre}
            movies={this.state.movies}
            onAddFavorite={this.onAddFavorite}
            onClickMovieItem={this.onClickMovieItem}
            onHideMovie={this.onHideMovie}
          />{' '}
          <HiddenList hiddenList={this.state.hidden} onClickMovieItem={this.onClickMovieItem} />
          <Footer />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default App;
