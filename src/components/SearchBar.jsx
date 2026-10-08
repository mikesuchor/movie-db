import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Search, X } from 'lucide-react';

const Form = styled.form`
  position: relative;
  flex: 1;
  max-width: 420px;
  margin-left: auto;

  @media (max-width: 640px) {
    max-width: none;
    margin-left: 0;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 38px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
  font: inherit;
  font-size: 15px;
  transition: border-color 0.2s, background 0.2s;

  &::placeholder {
    color: var(--muted);
  }

  &:focus {
    outline: none;
    border-color: var(--gold);
    background: var(--surface);
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 13px;
  top: 12px;
  color: var(--muted);
  pointer-events: none;
`;

const Clear = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: var(--surface-2);
  color: var(--text);
`;

const SearchBar = ({ onSearchSubmit, onSearchClear }) => {
  const [input, setInput] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(input);
  };

  const onChangeInput = (event) => {
    setInput(event.target.value);
    // Clearing the box brings back the default movies
    if (!event.target.value.trim()) onSearchClear();
  };

  const clear = () => {
    setInput('');
    onSearchClear();
  };

  return (
    <Form role="search" onSubmit={handleSubmit}>
      <SearchIcon size={18} aria-hidden="true" />
      <Input
        type="search"
        name="search"
        placeholder="Search movies"
        aria-label="Search movies"
        autoComplete="off"
        value={input}
        onChange={onChangeInput}
      />
      {input && (
        <Clear type="button" aria-label="Clear search" onClick={clear}>
          <X size={16} />
        </Clear>
      )}
    </Form>
  );
};

SearchBar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  onSearchClear: PropTypes.func.isRequired
};

export default SearchBar;
