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

const NavBar = ({ onSelectGenre, onSearchSubmit }) => {
  return (
    <div className="ui secondary menu">
      <button className="item">
        <i className="home icon"></i>
        HOME
      </button>
      <Dropdown onSelectGenre={onSelectGenre} />
      <div className="right menu">
        <SearchBar onSearchSubmit={onSearchSubmit} />
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
