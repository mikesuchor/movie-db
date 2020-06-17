import React from "react";
import SearchBar from "./SearchBar";
import "./css/NavBar.css";

const NavBar = (props) => {
  return (
    <div className="ui secondary menu">
      <a className="item" href="/">
        <i className="home icon"></i>
        Home
      </a>
      <a className="item" href="/movies">
        <i className="film icon"></i>
        Movies
      </a>
      <a className="item" href="/tv">
        <i className="tv icon"></i>
        TV Shows
      </a>
      <div className="right menu">
        <SearchBar onFormSubmit={props.onFormSubmit} />
        <a className="item" href="/mylist">
          <i className="plus icon"></i>
          My List
        </a>
        <a className="item" href="/profile">
          <i className="user icon"></i>
          Profile
        </a>
      </div>
    </div>
  );
};

export default NavBar;
