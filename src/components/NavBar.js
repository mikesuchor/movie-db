import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import SearchBar from './SearchBar';
import './css/NavBar.css';

// Labels are hidden on phones (see NavBar.css), so each button also has an aria-label
const NavBar = ({ onGoHome, onSelectGenre, onSearchSubmit, onSearchClear, onShowMyList }) => {
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <div className="ui secondary menu">
      <button className="item" aria-label="Home" onClick={onGoHome}>
        <i className="home icon"></i>
        <span className="nav-label">HOME</span>
      </button>
      <Dropdown onSelectGenre={onSelectGenre} />
      <div className="right menu">
        {searchOpen && <SearchBar onSearchSubmit={onSearchSubmit} onSearchClear={onSearchClear} />}
        <button
          className="item"
          aria-label="Search"
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <i className="search icon"></i>
          <span className="nav-label">SEARCH</span>
        </button>
        <button className="item" aria-label="My list" onClick={onShowMyList}>
          <i className="plus icon"></i>
          <span className="nav-label">MY LIST</span>
        </button>
        <button className="item" aria-label="Profile">
          <i className="user icon"></i>
          <span className="nav-label">PROFILE</span>
        </button>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  onGoHome: PropTypes.func.isRequired,
  onSelectGenre: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  onSearchClear: PropTypes.func.isRequired,
  onShowMyList: PropTypes.func.isRequired
};

export default NavBar;
