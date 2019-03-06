import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSearchToUser, deleteUserHistory } from "../services/userApi";
import Popup from "reactjs-popup";
import Table from '../components/Table'
import './css/Search.css';
import { fetchSearch } from '../actions';
import { getTotalResults } from '../reducers';
import Modal from 'react-modal';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Search extends PureComponent {

  constructor(props) {
    super(props);
    this.state = { text: '', modalIsOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
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
      fetchSearch(text).then(response => {
        const numOfResults = response.data.photos.total;
        console.log('numOfResults',numOfResults);
        addSearchToUser(userToken, text, numOfResults);
      });
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
    this.closeModal()
  }
  deleteAllData = () => {
    deleteUserHistory(this.props.userToken);
    this.closeModal()
  }
  render() {

    const { text, totalResults } = this.state;
    const { userToken } = this.props;
    return (

      <div>
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
            <div>
              <button type="button" className="waves-effect grey darken-2 btn" onClick={this.openModal}>History</button>
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1%' }}>
                  <button className="waves-effect grey darken-2 btn" onClick={this.closeModal}>Close</button>
                  &nbsp;
                <button className="waves-effect grey darken-2 btn" onClick={this.deleteAllData}>Clear all history</button>
                </div>
                <div>
                  <Table userToken={userToken} onRowClick={this.searchRowClick} />
                </div>
              </Modal>
            </div>
          </div>


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
