import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './css/Search.css';
import { fetchSearch } from '../actions';

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleInput = event => {
    this.setState({ text: event.target.value });
  };

  handleButton = () => {
    const { fetchSearch } = this.props;
    const { text } = this.state;
    fetchSearch(text);
  };

  handleKeyPressed = event => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 -> Enter keycode
      this.handleButton();
    }
  };

  render() {
    const { text } = this.state;
    return (
      <div className="Search">
        <div className="Search-input">
          <input
            type="text"
            className="Search-input-text"
            placeholder="Search for photos!"
            value={text}
            onChange={this.handleInput}
            onKeyPress={this.handleKeyPressed}
          />
        </div>

        <button
          type="button"
          className="Search-button"
          onClick={this.handleButton}
        >
          <span>Search</span>
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  fetchSearch: PropTypes.func.isRequired,
};

export default connect(
  null,
  { fetchSearch }
)(Search);
