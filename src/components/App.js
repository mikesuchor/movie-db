import React from "react";
import SearchBar from "./SearchBar";
import FeaturedMovie from "./FeaturedMovie";
import MoviesList from "./MoviesList";
import tmdb from "../api/tmdb";
import "./css/App.css";

class App extends React.Component {
  state = { movies: [], featuredMovie: "" };

  async componentDidMount() {
    const response = await tmdb.get("/3/discover/movie/", {
      params: {
        api_key: "1155f6c239cb4332df695fcf245eaffd"
      }
    });
    this.setState({
      movies: response.data.results,
      featuredMovie: response.data.results[0]
    });
  }

  onFormSubmit = async (input) => {
    const response = await tmdb.get("/3/search/movie/", {
      params: {
        api_key: "1155f6c239cb4332df695fcf245eaffd",
        query: input
      }
    });
    this.setState({
      movies: response.data.results,
      featuredMovie: response.data.results[0]
    });
  };

  render() {
    return (
      <div>
        <SearchBar onFormSubmit={this.onFormSubmit} />
        <FeaturedMovie featuredMovie={this.state.featuredMovie} />
        <MoviesList movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
