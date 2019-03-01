import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './css/GalleryItem.css';

class GalleryItem extends PureComponent {
  handleClick = () => {
    const { id, setIdDetail } = this.props;
    setIdDetail(id);
  };

  render() {
    const { title, url_q } = this.props;
    return (
      <div className="GalleryItem">
        <img
          className="GalleryImage"
          src={url_q}
          alt={title}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

GalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url_q: PropTypes.string.isRequired,
  setIdDetail: PropTypes.func.isRequired,
};

export default GalleryItem;
