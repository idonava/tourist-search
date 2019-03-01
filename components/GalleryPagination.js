import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getSearchText,
  getSearchPageSelected,
  getSearchNumberOfPages,
} from '../reducers';
import { fetchSearch } from '../actions';

import './css/GalleryPagination.css';

class GalleryPagination extends PureComponent {
  isPreviousPageAvailable = () => {
    const { pageSelected } = this.props;
    return pageSelected !== 1;
  };

  handlePreviousPage = () => {
    const { text, pageSelected, fetchSearch } = this.props;
    if (this.isPreviousPageAvailable()) fetchSearch(text, pageSelected - 1);
  };

  handleNextPage = () => {
    const { text, pageSelected, fetchSearch } = this.props;
    fetchSearch(text, pageSelected + 1);
  };

  render() {
    const { pageSelected, numberOfPages } = this.props;
    if (pageSelected === null || numberOfPages === null) return null;
    return (
      <div className="GalleryPagination">
        <button
          type="button"
          className="GalleryPaginationButton"
          onClick={this.handlePreviousPage}
          disabled={!this.isPreviousPageAvailable()}
        >
          Previous
        </button>
        <span className="GalleryPaginationText">
          Page {pageSelected} of {numberOfPages}{' '}
        </span>
        <button
          type="button"
          className="GalleryPaginationButton"
          onClick={this.handleNextPage}
        >
          Next
        </button>
      </div>
    );
  }
}

GalleryPagination.propTypes = {
  text: PropTypes.string,
  pageSelected: PropTypes.number,
  numberOfPages: PropTypes.number,
  fetchSearch: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    text: getSearchText(state),
    pageSelected: getSearchPageSelected(state),
    numberOfPages: getSearchNumberOfPages(state),
  };
};

export default connect(
  mapStateToProps,
  { fetchSearch }
)(GalleryPagination);
