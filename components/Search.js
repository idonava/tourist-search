import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSearchToUser } from "../services/userApi";
import Popup from "reactjs-popup";
import Table from '../components/Table'
import './css/Search.css';
import { fetchSearch } from '../actions';
import { redirectIfNotAuthenticated, isAuthenticated, getToken } from "../libs/auth";
import { getUser } from '../libs/user'
import { getTotalResults } from '../reducers';

class Search extends PureComponent {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleInput = value => {
    this.setState({ text: value });
  };
  validString = (str) => {
    return typeof str == 'string' &&
      str.trim() != '';
  }
  handleButton = () => {
    const { userToken } = this.props;
    const { fetchSearch } = this.props;
    const { text, totalResults } = this.state;
    console.log('userrrrrrrr', userToken)
    if (this.validString(text)) {
      const ans = fetchSearch(text);
      console.log('ans', ans)
      console.log('totalResults', totalResults)

      addSearchToUser(userToken, text, totalResults);
    }
    else {
      console.log('Invalid search term')
    }


  };

  handleKeyPressed = event => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 -> Enter keycode
      this.handleButton();
    }
  };
  searchRowClick = (row) => {
    console.log('row in search', row);
    this.state.text = row.search_term;
    this.handleInput(row.search_term)

    this.handleButton();
  }
  render() {

    const { text, totalResults } = this.state;
    const { userToken } = this.props;
    return (
      <div className="Search">
        <div className="Search-input">
          <input
            type="text"
            className="Search-input-text"
            placeholder="Search for photos!"
            value={text}
            onChange={event => this.handleInput(event.target.value)}
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
        <Popup trigger={<button className="History-button"> History </button>} modal closeOnDocumentClick>
          <Table userToken={userToken} onRowClick={this.searchRowClick} />
        </Popup>
      </div>
    );
  }
}

Search.propTypes = {
  fetchSearch: PropTypes.func.isRequired,
  totalResults: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    totalResults: getTotalResults(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchSearch },


)(Search);
