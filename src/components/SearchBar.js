import React from 'react';
import './css/SearchBar.css';
import styled from 'styled-components';

const Search = styled.div`
  display: none;
`;

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
    <Search className="search-bar ui search">
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
    </Search>
  );
};

export default SearchBar;
