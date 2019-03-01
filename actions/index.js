import axios from 'axios';

import {
  URL_FLICKR_API_BASE,
  URL_FLICKR_METHOD_SEARCH,
  URL_FLICKR_API_KEY,
  URL_FLICKR_FORMAT,
  URL_FLICKR_NO_JSON_CALLBACK,
  URL_FLICKR_EXTRAS,
} from '../config/constants';

// Search by term
export const SEARCH_FETCH = 'SEARCH@FETCH';
export const SEARCH_FETCH_REQUEST = 'SEARCH@FETCH/REQUEST';
export const SEARCH_FETCH_SUCCESS = 'SEARCH@FETCH/SUCCESS';
export const SEARCH_FETCH_FAILURE = 'SEARCH@FETCH/FAILURE';

// Select an item
export const DETAIL_SET_ID = 'DETAIL@SET_ID';
export const DETAIL_RESET = 'DETAIL@RESET';

export const fetchSearch = (text, page = 1) => {
  if (!text) return { type: SEARCH_FETCH_FAILURE };
  const url = `${URL_FLICKR_API_BASE}?
    method=${URL_FLICKR_METHOD_SEARCH}&
    api_key=${URL_FLICKR_API_KEY}&
    text=${text}&
    format=${URL_FLICKR_FORMAT}&
    nojsoncallback=${URL_FLICKR_NO_JSON_CALLBACK}&
    extras=${URL_FLICKR_EXTRAS}&
    page=${page}`;
  const meta = { text, page };
  return doFetch(SEARCH_FETCH, url, meta);
};

export const setIdDetail = id => {
  return {
    type: DETAIL_SET_ID,
    payload: {
      id,
    },
  };
};

export const resetDetail = () => {
  return {
    type: DETAIL_RESET,
  };
};

/*
 * Extracted from: https://github.com/reactjs/redux/issues/1676
 ***/
export const doFetch = (type, url, meta = {}) => {
  // Redux Thunk will inject dispatch here:
  return dispatch => {
    // Reducers may handle this to set a flag like isFetching
    dispatch({
      type: type + '/REQUEST',
      payload: {
        meta,
      },
    });

    //The response function
    const theResponse = response => {
      dispatch({
        type: type + '/SUCCESS',
        payload: {
          response,
          meta,
        },
      });
    };

    //The error function
    const theError = error => {
      dispatch({
        type: type + '/FAILURE',
        payload: {
          error,
          meta,
        },
      });
    };

    // Perform the actual API call
    return axios.get(url).then(theResponse, theError);
  };
};
