import React from 'react';
import Dropdown from './Dropdown';
import SearchBar from './SearchBar';
import './css/NavBar.css';

const toggleSearchInput = () => {
  const searchBarElement = document.querySelector('.search-bar');
  if (!searchBarElement.style.display || searchBarElement.style.display === 'none') {
    searchBarElement.style.display = 'block';
  } else {
    searchBarElement.style.display = 'none';
  }
};

const NavBar = (props) => {
  return (
    <div className="ui secondary menu">
      <button className="item">
        <i className="home icon"></i>
        HOME
      </button>
      {/* <button className="item" onClick={() => props.onSelectMoviesCategory()}>
        <i className="film icon"></i>
        MOVIES
      </button>
      <button className="item" onClick={() => props.onSelectTVCategory()}>
        <i className="tv icon"></i>
        TV SHOWS
      </button> */}
      <Dropdown onSelectGenre={props.onSelectGenre} />
      <div className="right menu">
        <SearchBar onSearchSubmit={props.onSearchSubmit} />
        <button className="item" onClick={() => toggleSearchInput()}>
          <i className="search icon"></i>
          SEARCH
        </button>
        <button className="item">
          <i className="plus icon"></i>
          MY LIST
        </button>
        <button className="item" href="/profile">
          <i className="user icon"></i>
          PROFILE
        </button>
      </div>
    </div>
  );
};

export default NavBar;
