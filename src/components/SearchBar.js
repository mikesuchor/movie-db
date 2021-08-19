import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './css/SearchBar.css';

const SearchBar = ({ onSearchSubmit }) => {
  const [input, handleInput] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(input);
  };

  const onChangeInput = (event) => {
    handleInput(event.target.value);
  };

  return (
    <div className="search-bar ui search">
      <form className="search-form ui icon input" onSubmit={handleSubmit}>
        <i className="search icon"></i>
        <input
          className="search-field"
          type="text"
          name="search"
          placeholder="Search..."
          value={input}
          onChange={onChangeInput}
        />
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired
};

export default SearchBar;
