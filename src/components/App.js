import React from 'react';
import NavBar from './NavBar';
import FeaturedMovie from './FeaturedMovie';
import MoviesList from './MoviesList';
import FavoritesList from './FavoritesList';
import HiddenList from './HiddenList';
import Footer from './Footer';
import tmdb from '../api/tmdb';
import { pickTrailer } from '../api/helpers';
import './css/App.css';

const API_KEY = '1155f6c239cb4332df695fcf245eaffd';

class App extends React.Component {
  state = {
    dataLoaded: false,
    movies: [],
    favorites: [],
    hidden: [],
    featuredMovie: '',
    featuredMovieTrailer: undefined,
    genre: '',
    query: '',
    myListOpened: false
  };

  latestRequest = 0;

  // Returns false if a newer request started meanwhile, so its results aren't overwritten
  getMovies = async (action, query = '', with_genres = '', updateFeatured = action !== 'search') => {
    const request = ++this.latestRequest;
    const params = {
      api_key: API_KEY,
      include_adult: false,
      include_video: false,
      query,
      'vote_count.gte': 100,
      with_genres
    };
    const [movies, movies2] = await Promise.all(
      [1, 2].map((page) => tmdb.get(`/3/${action}/movie`, { params: { ...params, page } }))
    );
    if (request !== this.latestRequest) return false;

    const fetchedMovies = [...movies.data.results, ...movies2.data.results];

    // TMDB's relevance order buries the well-known matches and also matches inside original
    // titles ("dune" hits "d'une"), so put titles containing the query as a word first, by popularity
    if (action === 'search') {
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const titleMatch = new RegExp(`\\b${escaped}\\b`, 'i');
      const rank = (movie) => (titleMatch.test(movie.title) ? 0 : 1);
      fetchedMovies.sort((a, b) => rank(a) - rank(b) || b.popularity - a.popularity);
    }

    const filteredMovies = this.compareHiddenMovies(this.state.hidden, fetchedMovies);

    const newState = {
      dataLoaded: true,
      movies: filteredMovies ? filteredMovies : fetchedMovies
    };

    // Searching keeps the current featured movie; browsing features the top result
    if (updateFeatured && movies.data.results.length) {
      newState.featuredMovie = movies.data.results[0];
      newState.featuredMovieTrailer = await this.getTrailer(newState.featuredMovie.id);
      if (request !== this.latestRequest) return false;
    }

    this.setState(newState);
    return true;
  };

  getTrailer = async (movieId) => {
    const videos = await tmdb.get(`/3/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY
      }
    });
    return pickTrailer(videos.data.results);
  };

  // When App component mounts, get movie data from tmdb using "discover" action and get favorites from local storage
  componentDidMount() {
    this.getMovies('discover');
    const favorites = JSON.parse(localStorage.getItem('movie-database-favorites'));
    const hidden = JSON.parse(localStorage.getItem('movie-database-hidden'));
    if (favorites) {
      this.setState({
        favorites
      });
    }
    if (hidden) {
      this.setState({
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
      genre,
      query: ''
    });
  };

  // When HOME is clicked, go back to trending movies across all genres
  onGoHome = () => {
    this.getMovies('discover');
    this.setState({
      genre: '',
      query: ''
    });
    window.scrollTo(0, 0);
  };

  // When SearchBar component is submitted, get movie data from tmdb using "search" action and scroll to the results
  onSearchSubmit = async (input) => {
    const query = input.trim();
    if (!query) {
      this.onSearchClear();
      return;
    }
    if (!(await this.getMovies('search', query))) return;
    this.setState({
      genre: '',
      query
    });
    document.getElementById('movies-list').scrollIntoView();
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

  // When the search is emptied, go back to trending movies but keep the featured movie
  onSearchClear = async () => {
    if (!this.state.query) return;
    if (!(await this.getMovies('discover', '', '', false))) return;
    this.setState({
      genre: '',
      query: ''
    });
  };

  // When MY LIST is clicked, scroll up to the favorites list (shown even if empty)
  onShowMyList = () => {
    this.setState({ myListOpened: true }, () => {
      document.getElementById('favorites-list').scrollIntoView();
    });
  };

  // When a Movie is clicked update the featured movie with the movie data and trailer
  onClickMovieItem = async (movie) => {
    const clickedMovieTrailer = await this.getTrailer(movie.id);
    this.setState({
      featuredMovie: movie,
      featuredMovieTrailer: clickedMovieTrailer
    });
    window.scrollTo(0, 0);
  };

  onHideMovie = (movie) => {
    if (!this.state.hidden.some((hidden) => hidden.id === movie.id)) {
      const hiddenList = [...this.state.hidden, movie];
      const filteredMovieList = this.state.movies.filter((movieObject) => movieObject.id !== movie.id);
      this.setState({
        movies: filteredMovieList,
        hidden: hiddenList
      });
      this.saveToLocalStorage('hidden', hiddenList);
    }
  };

  compareHiddenMovies = (hiddenMovies, moviesList) => {
    if (this.state.hidden && this.state.hidden.length) {
      const hiddenMovieIDs = hiddenMovies.map(function (a) {
        return a.id;
      });

      return moviesList.filter(function (a) {
        return hiddenMovieIDs.indexOf(a.id) === -1;
      });
    }
  };

  clearHiddenList = () => {
    this.setState({ hidden: [] });
    localStorage.removeItem('movie-database-hidden');
  };

  render() {
    if (this.state.dataLoaded) {
      return (
        <div>
          <NavBar
            onGoHome={this.onGoHome}
            onSelectGenre={this.onSelectGenre}
            onSearchSubmit={this.onSearchSubmit}
            onSearchClear={this.onSearchClear}
            onShowMyList={this.onShowMyList}
          />
          <FeaturedMovie
            featuredMovie={this.state.featuredMovie}
            featuredMovieTrailer={this.state.featuredMovieTrailer}
          />
          <FavoritesList
            favorites={this.state.favorites}
            showEmpty={this.state.myListOpened}
            onAddFavorite={this.onAddFavorite}
            onRemoveFavorite={this.onRemoveFavorite}
            onClickMovieItem={this.onClickMovieItem}
          />
          <MoviesList
            genre={this.state.genre}
            query={this.state.query}
            movies={this.state.movies}
            onAddFavorite={this.onAddFavorite}
            onClickMovieItem={this.onClickMovieItem}
            onHideMovie={this.onHideMovie}
          />{' '}
          <HiddenList
            hiddenList={this.state.hidden}
            onClickMovieItem={this.onClickMovieItem}
            clearHiddenList={this.clearHiddenList}
          />
          <Footer />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default App;
