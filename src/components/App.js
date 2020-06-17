import React from "react";
import NavBar from "./NavBar";
import FeaturedMovie from "./FeaturedMovie";
import MoviesList from "./MoviesList";
import Footer from "./Footer";
import tmdb from "../api/tmdb";
import "./css/App.css";

class App extends React.Component {
  state = {
    dataLoaded: false,
    movies: [],
    featuredMovie: "",
    featuredMovieTrailer: ""
  };

  getMovies = async (action, query = "") => {
    const movies = await tmdb.get(`/3/${action}/movie/`, {
      params: {
        api_key: "1155f6c239cb4332df695fcf245eaffd",
        include_adult: false,
        include_video: false,
        query,
        "vote_count.gte": 100
      }
    });
    const featuredMovieTrailer = await this.getTrailer(
      movies.data.results[0].id
    );
    this.setState({
      dataLoaded: true,
      movies: movies.data.results,
      featuredMovie: movies.data.results[0],
      featuredMovieTrailer: featuredMovieTrailer.data.results[0]
    });
  };

  getTrailer = async (movie) => {
    return tmdb.get(`/3/movie/${movie}/videos`, {
      params: {
        api_key: "1155f6c239cb4332df695fcf245eaffd"
      }
    });
  };

  // When App component mounts, get movie data from tmdb using "discover" action and store it in state
  componentDidMount() {
    this.getMovies("discover");
  }

  // When SearchBar component is submitted, get movie data from tmdb using "search" action and input query and store it in state
  onFormSubmit = (input) => {
    this.getMovies("search", input);
  };

  onClickMovieItem = async (movie) => {
    const clickedMovieTrailer = await this.getTrailer(movie.id);
    console.log(clickedMovieTrailer);
    this.setState({
      featuredMovie: movie,
      featuredMovieTrailer: clickedMovieTrailer.data.results[0]
    });
  };

  render() {
    if (this.state.dataLoaded) {
      return (
        <div>
          <NavBar onFormSubmit={this.onFormSubmit} />
          <FeaturedMovie
            featuredMovie={this.state.featuredMovie}
            featuredMovieTrailer={this.state.featuredMovieTrailer}
          />
          <MoviesList
            movies={this.state.movies}
            onClickMovieItem={this.onClickMovieItem}
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
