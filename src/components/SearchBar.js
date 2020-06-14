import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./css/SearchBar.css";

class SearchBar extends React.Component {
  state = { input: "" };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.input);
  };

  onChangeInput = (event) => {
    this.setState({ input: event.target.value });
  };

  render() {
    return (
      <div className="search-field-container">
        <form className="search-form" onSubmit={this.onFormSubmit}>
          <span>
            <button className="submit-button" type="submit">
              <i className="search icon"></i>
            </button>
          </span>
          <input
            className="search-field"
            type="text"
            name="search"
            placeholder="Search..."
            value={this.state.input}
            onChange={this.onChangeInput}
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
