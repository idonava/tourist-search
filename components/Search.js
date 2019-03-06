import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSearchToUser } from "../services/userApi";
import Popup from "reactjs-popup";
import Table from '../components/Table'
import './css/Search.css';
import { fetchSearch } from '../actions';
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
    const { text } = this.state;
    if (this.validString(text)) {
      fetchSearch(text);
      const { totalResults } = this.state;
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
    this.state.text = row.search_term;
    this.handleInput(row.search_term)

    this.handleButton();
  }
  render() {

    const { text, totalResults } = this.state;
    const { userToken } = this.props;
    return (
      <div className="Search" style={{ display: 'flex' }}>
        <div className="Search-input">
          <input
            type="text"
            className="input-field col s6"
            placeholder="Search for photos!"
            value={text}
            onChange={event => this.handleInput(event.target.value)}
            onKeyPress={this.handleKeyPressed}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="button"
            className="waves-effect grey darken-2 btn"
            onClick={this.handleButton}
          > <span>Search</span>
          </button>
          &nbsp;
        <Popup trigger={<button className="waves-effect grey darken-2 btn-small"> History </button>} lockScroll modal closeOnDocumentClick>
            <Table userToken={userToken} onRowClick={this.searchRowClick} />
          </Popup>
        </div>

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
