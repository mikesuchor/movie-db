import React from "react";
import SearchBar from "./SearchBar";
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
        query
      }
    });
    const featuredMovieTrailer = await tmdb.get(
      `/3/movie/${movies.data.results[0].id}/videos`,
      {
        params: {
          api_key: "1155f6c239cb4332df695fcf245eaffd"
        }
      }
    );
    this.setState({
      dataLoaded: true,
      movies: movies.data.results,
      featuredMovie: movies.data.results[0],
      featuredMovieTrailer: featuredMovieTrailer.data.results[0]
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

  render() {
    if (this.state.dataLoaded) {
      return (
        <div>
          <SearchBar onFormSubmit={this.onFormSubmit} />
          <FeaturedMovie
            featuredMovie={this.state.featuredMovie}
            featuredMovieTrailer={this.state.featuredMovieTrailer}
          />
          <MoviesList movies={this.state.movies} />
          <Footer />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default App;
