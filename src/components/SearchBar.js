import React from "react";
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
      <div className="search-field-container ui search">
        <form
          className="search-form ui icon input"
          onSubmit={this.onFormSubmit}
        >
          <i className="search icon"></i>
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
