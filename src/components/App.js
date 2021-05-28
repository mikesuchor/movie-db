import React from 'react';
import NavBar from './NavBar';
import FeaturedMovie from './FeaturedMovie';
import MoviesList from './MoviesList';
import Footer from './Footer';
import tmdb from '../api/tmdb';
import './css/App.css';

class App extends React.Component {
  state = {
    dataLoaded: false,
    movies: [],
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
    console.log(movies);
    const featuredMovieTrailer = await this.getTrailer(movies.data.results[0].id);
    this.setState({
      dataLoaded: true,
      movies: [...movies.data.results, ...movies2.data.results],
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

  // When App component mounts, get movie data from tmdb using "discover" action and store it in state
  componentDidMount() {
    this.getMovies('discover');
  }

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

  // When a Movie is clicked update the featured movie with the movie data and trailer
  onClickMovieItem = async (movie) => {
    const clickedMovieTrailer = await this.getTrailer(movie.id);
    this.setState({
      featuredMovie: movie,
      featuredMovieTrailer: clickedMovieTrailer.data.results[0]
    });
    window.scrollTo(0, 0);
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
          <MoviesList genre={this.state.genre} movies={this.state.movies} onClickMovieItem={this.onClickMovieItem} />
          <Footer />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default App;
