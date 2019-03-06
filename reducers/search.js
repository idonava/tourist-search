import {
  SEARCH_FETCH_REQUEST,
  SEARCH_FETCH_SUCCESS,
  SEARCH_FETCH_FAILURE,
} from '../actions';

const defaultState = {
  isLoading: false,
  pageSelected: null,
  photos: {},
  stat: null,
  text: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case SEARCH_FETCH_REQUEST:
      return { ...state, isLoading: true };

    case SEARCH_FETCH_SUCCESS: {
      if (!action.payload.response.data) return defaultState;
      const { text, page } = action.payload.meta;
      return {
        ...state,
        ...action.payload.response.data,
        text,
        pageSelected: page,
        isLoading: false,
      };
    }

    case SEARCH_FETCH_FAILURE:
      return { ...defaultState };

    default:
      return state;
  }
}

export const getSearchIsLoading = state => state.isLoading;

export const getSearchPhotos = state => {
  if (!state.photos || !state.photos.photo) return [];
  return state.photos.photo.map(item => {
    const { id, owner, ownername, title, url_m, url_q } = item;
    return { id, owner, ownername, title, url_m, url_q };
  });
};

export const getSearchStat = state => state.stat;

export const getSearchText = state => state.text;

export const getSearchPageSelected = state => state.pageSelected;

export const getSearchNumberOfPages = state => {
  if (!state.photos) return null;
  return state.photos.pages;
};
export const getTotalResults = state => {
  if (!state || !state.photos) return null;
  return state.photos.total;
};
export const getUserToken = state => {
  if (!state) return null;
  return state.userToken;
};
export const getSearchLargePhotos = state => {
  if (!state.photos || !state.photos.photo) return [];
  return state.photos.photo.map(item => {
    const {
      id,
      owner,
      ownername,
      title,
      url_o,
      url_l,
      url_c,
      url_z,
      url_n,
      url_m,
      url_q,
    } = item;
    return {
      id,
      owner,
      ownername,
      title,
      url_o,
      url_l,
      url_c,
      url_z,
      url_n,
      url_m,
      url_q,
    };
  });
};
