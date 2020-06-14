import React from "react";
import SearchBar from "./SearchBar";
import {
  FaHome,
  FaFilm,
  FaTv,
  FaSearch,
  FaHeart,
  FaSmile
} from "react-icons/fa";
import "./css/NavBar.css";

const NavBar = (props) => {
  return (
    <div className="ui secondary menu">
      <a className="item">
        <i className="home icon"></i>
        Home
      </a>
      <a className="item">
        <i className="film icon"></i>
        Movies
      </a>
      <a className="item">
        <i className="tv icon"></i>
        TV Shows
      </a>
      <div className="right menu">
        <a className="item">
          <SearchBar onFormSubmit={props.onFormSubmit} />
        </a>
        <a className="item">
          <i className="plus icon"></i>
          My List
        </a>
        <a className="item">
          <i className="user icon"></i>
          Profile
        </a>
      </div>
    </div>
  );
};

export default NavBar;
