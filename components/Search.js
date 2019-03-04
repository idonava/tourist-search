import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSearchToUser } from "../services/userApi";

import './css/Search.css';
import { fetchSearch } from '../actions';
import { redirectIfNotAuthenticated, isAuthenticated, getToken } from "../libs/auth";

class Search extends PureComponent {
  static async getInitialProps(ctx) {
    if (redirectIfNotAuthenticated(ctx)) {
        return {};
    }
    const token = getToken(ctx)
    const res =await  getCurrentUser(token)
    return {
        user: res.data,
        authenticated: isAuthenticated(ctx)
    };
}

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleInput = event => {
    this.setState({ text: event.target.value });
  };
  validString = (str) => {
    return typeof str == 'string' &&
      str.trim() != '';
  }
  handleButton = () => {
    const { authenticated, url, user } = this.props;
    const { fetchSearch } = this.props;
    const { text } = this.state;
    if (this.validString(text)) {
      fetchSearch(text);
      addSearchToUser(user,text);
    }
    else {
      //console.log('Invalid search term')
    }


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
