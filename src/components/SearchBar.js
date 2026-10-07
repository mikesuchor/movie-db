import React from 'react';
import PropTypes from 'prop-types';
import './css/SearchBar.css';

const SearchBar = ({ onSearchSubmit, onSearchClear }) => {
  const [input, handleInput] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(input);
  };

  const onChangeInput = (event) => {
    handleInput(event.target.value);
    // Clearing the box brings back the default movies
    if (!event.target.value.trim()) onSearchClear();
  };

  return (
    <div className="search-bar ui search">
      <form className="search-form ui icon input" onSubmit={handleSubmit}>
        <i className="search link icon" role="button" aria-label="Submit search" onClick={handleSubmit}></i>
        <input
          className="search-field"
          type="text"
          name="search"
          placeholder="Search..."
          aria-label="Search movies"
          autoFocus
          value={input}
          onChange={onChangeInput}
        />
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  onSearchClear: PropTypes.func.isRequired
};

export default SearchBar;
