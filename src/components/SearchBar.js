import React from "react";

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
      <form onSubmit={this.onFormSubmit}>
        <input
          type="text"
          value={this.state.input}
          onChange={this.onChangeInput}
        />
      </form>
    );
  }
}

export default SearchBar;
