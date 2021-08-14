import React from 'react';
import Dropdown from './Dropdown';
import SearchBar from './SearchBar';
import './css/NavBar.css';
import styled from 'styled-components';

const Menu = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 65px;
  z-index: 10;
  padding: 10px;
  margin: 0;
  background: #144b5c;
  border-bottom: 1px solid #fdfdfe;
`;

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
    <Menu className="ui secondary menu">
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
    </Menu>
  );
};

export default NavBar;
