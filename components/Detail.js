import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './css/Detail.css';

import { setIdDetail, resetDetail } from '../actions';
import { getDetailId, getSearchLargePhotos } from '../reducers';

class Detail extends PureComponent {
  getIndexOfPhoto = (photos, id) => {
    if (photos === undefined || photos === null || !photos.length) return null;
    if (id === undefined || id === null) return null;
    const indexOfPhoto = photos.findIndex(item => item.id === id);
    if (indexOfPhoto < 0) return null;
    return indexOfPhoto;
  };

  getCurrentPhoto = () => {
    const { id, photos } = this.props;
    const indexOfPhoto = this.getIndexOfPhoto(photos, id);
    if (indexOfPhoto >= 0) return photos[indexOfPhoto];
    return null;
  };

  getPreviousPhoto = () => {
    const { id, photos } = this.props;
    const indexOfPhoto = this.getIndexOfPhoto(photos, id);
    if (indexOfPhoto > 0) return photos[indexOfPhoto - 1];
    return null;
  };

  getNextPhoto = () => {
    const { id, photos } = this.props;
    const indexOfPhoto = this.getIndexOfPhoto(photos, id);
    if (indexOfPhoto < photos.length - 1) return photos[indexOfPhoto + 1];
    return null;
  };

  handleClickPrevious = () => {
    const { setIdDetail } = this.props;
    const previousPhoto = this.getPreviousPhoto();
    setIdDetail(previousPhoto.id);
  };

  handleClickNext = () => {
    const { setIdDetail } = this.props;
    const nextPhoto = this.getNextPhoto();
    setIdDetail(nextPhoto.id);
  };

  /**
   * Get the hightest quality photo URL
   */
  getUrlFromPhoto = photo => {
    if (!photo) return null;
    if (photo.url_o) return photo.url_o;
    if (photo.url_l) return photo.url_l;
    if (photo.url_c) return photo.url_c;
    if (photo.url_z) return photo.url_z;
    if (photo.url_n) return photo.url_n;
    if (photo.url_m) return photo.url_m;
    if (photo.url_q) return photo.url_q;
    return photo.url_q;
  };

  getImageTitle = current => {
    const { owner, id, ownername, title } = current;
    const url = `https://www.flickr.com/photos/${owner}/${id}/`;
    return (
      <Fragment>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="DetailImageTitle"
        >
          <span className="DetailImageTitleText">Open</span>
        </a>
        <span className="DetailImageTitleOwner">
          ${title} by ${ownername}
        </span>
      </Fragment>
    );
  };

  render() {
    const { id, resetDetail } = this.props;

    const current = this.getCurrentPhoto();
    const previous = this.getPreviousPhoto();
    const next = this.getNextPhoto();

    return (
      <Fragment>
        {id !== null &&
          current !== undefined && (
            <Lightbox
              mainSrc={this.getUrlFromPhoto(current)}
              prevSrc={this.getUrlFromPhoto(previous)}
              nextSrc={this.getUrlFromPhoto(next)}
              onCloseRequest={resetDetail}
              onMovePrevRequest={this.handleClickPrevious}
              onMoveNextRequest={this.handleClickNext}
              imageTitle={this.getImageTitle(current)}
            />
          )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: getDetailId(state),
    photos: getSearchLargePhotos(state),
  };
};

export default connect(
  mapStateToProps,
  { setIdDetail, resetDetail }
)(Detail);
