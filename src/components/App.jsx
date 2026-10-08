import React from 'react';
import { createGlobalStyle } from 'styled-components';
import NavBar from './NavBar';
import FeaturedMovie from './FeaturedMovie';
import MoviesList from './MoviesList';
import FavoritesList from './FavoritesList';
import HiddenList from './HiddenList';
import Footer from './Footer';
import tmdb from '../api/tmdb';
import { pickTrailer } from '../api/helpers';
import './css/App.css';

// Everything App.css doesn't cover: the extra tokens and base rules the styled components rely on
const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #07080a;
    --text: var(--white);
    --surface-2: #1d2027;
    --muted: #9aa0ab;
    --radius: 14px;
    --nav-h: 64px;
    --gutter: clamp(16px, 4vw, 56px);
    --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-padding-top: calc(var(--nav-h) + 12px);
  }

  /* the navbar is fixed and the hero already clears it, so no body padding */
  html body {
    padding-top: 0;
    background: var(--bg);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  html body,
  html body * {
    font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  }

  button {
    font: inherit;
    color: inherit;
    cursor: pointer;
  }

  img {
    display: block;
    max-width: 100%;
  }

  :focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

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
    myListOpened: false,
  };

  latestRequest = 0;

  // Returns false if a newer request started meanwhile, so its results aren't overwritten
  getMovies = async (
    action,
    query = '',
    with_genres = '',
    updateFeatured = action !== 'search',
  ) => {
    const request = ++this.latestRequest;
    const params = {
      api_key: API_KEY,
      include_adult: false,
      include_video: false,
      query,
      'vote_count.gte': 100,
      with_genres,
    };
    const [movies, movies2] = await Promise.all(
      [1, 2].map((page) =>
        tmdb.get(`/3/${action}/movie`, { params: { ...params, page } }),
      ),
    );
    if (request !== this.latestRequest) return false;

    const fetchedMovies = [...movies.data.results, ...movies2.data.results];

    // TMDB's relevance order buries the well-known matches and also matches inside original
    // titles ("dune" hits "d'une"), so put titles containing the query as a word first, by popularity
    if (action === 'search') {
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const titleMatch = new RegExp(`\\b${escaped}\\b`, 'i');
      const rank = (movie) => (titleMatch.test(movie.title) ? 0 : 1);
      fetchedMovies.sort(
        (a, b) => rank(a) - rank(b) || b.popularity - a.popularity,
      );
    }

    const filteredMovies = this.compareHiddenMovies(
      this.state.hidden,
      fetchedMovies,
    );

    const newState = {
      dataLoaded: true,
      movies: filteredMovies ? filteredMovies : fetchedMovies,
    };

    // Searching keeps the current featured movie; browsing features the top result
    if (updateFeatured && movies.data.results.length) {
      newState.featuredMovie = movies.data.results[0];
      newState.featuredMovieTrailer = await this.getTrailer(
        newState.featuredMovie.id,
      );
      if (request !== this.latestRequest) return false;
    }

    this.setState(newState);
    return true;
  };

  getTrailer = async (movieId) => {
    const videos = await tmdb.get(`/3/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });
    return pickTrailer(videos.data.results);
  };

  // When App component mounts, get movie data from tmdb using "discover" action and get favorites from local storage
  componentDidMount() {
    this.getMovies('discover');
    const favorites = JSON.parse(
      localStorage.getItem('movie-database-favorites'),
    );
    const hidden = JSON.parse(localStorage.getItem('movie-database-hidden'));
    if (favorites) {
      this.setState({
        favorites,
      });
    }
    if (hidden) {
      this.setState({
        hidden,
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
      query: '',
    });
  };

  // When the All chip is clicked, go back to trending movies across all genres, staying where you are
  onClearGenre = () => {
    this.getMovies('discover');
    this.setState({
      genre: '',
      query: '',
    });
  };

  // When the logo is clicked, do the same and scroll back to the top
  onGoHome = () => {
    this.onClearGenre();
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
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
      query,
    });
    document
      .getElementById('movies-list')
      .scrollIntoView({ behavior: 'smooth' });
  };

  // When the add favorite button is clicked, checks for duplicates then add to the favorite list and to local storage
  onAddFavorite = (movie) => {
    if (!this.state.favorites.some((favorite) => favorite.id === movie.id)) {
      const newFavoritesList = [...this.state.favorites, movie];
      this.setState({
        favorites: newFavoritesList,
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
      favorites: newFavoritesList,
    });
    this.saveToLocalStorage('favorites', newFavoritesList);
  };

  // When the search is emptied, go back to trending movies but keep the featured movie
  onSearchClear = async () => {
    if (!this.state.query) return;
    if (!(await this.getMovies('discover', '', '', false))) return;
    this.setState({
      genre: '',
      query: '',
    });
  };

  // When My List is clicked, scroll up to the favorites list (shown even if empty)
  onShowMyList = () => {
    this.setState({ myListOpened: true }, () => {
      document
        .getElementById('favorites-list')
        .scrollIntoView({ behavior: 'smooth' });
    });
  };

  // When a Movie is clicked update the featured movie with the movie data and trailer
  onClickMovieItem = async (movie) => {
    const clickedMovieTrailer = await this.getTrailer(movie.id);
    this.setState({
      featuredMovie: movie,
      featuredMovieTrailer: clickedMovieTrailer,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  onHideMovie = (movie) => {
    if (!this.state.hidden.some((hidden) => hidden.id === movie.id)) {
      const hiddenList = [...this.state.hidden, movie];
      const filteredMovieList = this.state.movies.filter(
        (movieObject) => movieObject.id !== movie.id,
      );
      this.setState({
        movies: filteredMovieList,
        hidden: hiddenList,
      });
      this.saveToLocalStorage('hidden', hiddenList);
    }
  };

  // Takes one movie off the hidden list; it shows up in the movie list again on the next load
  onUnhideMovie = (movie) => {
    const hiddenList = this.state.hidden.filter(
      (hidden) => hidden.id !== movie.id,
    );
    this.setState({ hidden: hiddenList });
    this.saveToLocalStorage('hidden', hiddenList);
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
    if (!this.state.dataLoaded) return <div></div>;

    const { featuredMovie } = this.state;
    return (
      <div>
        <GlobalStyle />
        <NavBar
          favoritesCount={this.state.favorites.length}
          onGoHome={this.onGoHome}
          onSearchSubmit={this.onSearchSubmit}
          onSearchClear={this.onSearchClear}
          onShowMyList={this.onShowMyList}
        />
        {featuredMovie && (
          <FeaturedMovie
            key={featuredMovie.id}
            featuredMovie={featuredMovie}
            featuredMovieTrailer={this.state.featuredMovieTrailer}
            isFavorite={this.state.favorites.some(
              (favorite) => favorite.id === featuredMovie.id,
            )}
            onAddFavorite={this.onAddFavorite}
            onRemoveFavorite={this.onRemoveFavorite}
          />
        )}
        <main>
          <FavoritesList
            favorites={this.state.favorites}
            showEmpty={this.state.myListOpened}
            onRemoveFavorite={this.onRemoveFavorite}
            onClickMovieItem={this.onClickMovieItem}
          />
          <MoviesList
            genre={this.state.genre}
            query={this.state.query}
            movies={this.state.movies}
            onSelectGenre={this.onSelectGenre}
            onClearGenre={this.onClearGenre}
            onAddFavorite={this.onAddFavorite}
            onClickMovieItem={this.onClickMovieItem}
            onHideMovie={this.onHideMovie}
          />
          <HiddenList
            hiddenList={this.state.hidden}
            onClickMovieItem={this.onClickMovieItem}
            onUnhideMovie={this.onUnhideMovie}
            clearHiddenList={this.clearHiddenList}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
