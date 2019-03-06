import { combineReducers } from 'redux';

import detail, * as fromDetail from './detail';
import search, * as fromSearch from './search';
const rootReducer = combineReducers({ detail, search});

// Selectors of detail reducer
export const getDetailId = state => fromDetail.getDetailId(state.detail);

// Selectors of search reducer
export const getSearchIsLoading = state =>
  fromSearch.getSearchIsLoading(state.search);
export const getSearchPhotos = state =>
  fromSearch.getSearchPhotos(state.search);
export const getSearchStat = state => fromSearch.getSearchStat(state.search);
export const getSearchText = state => fromSearch.getSearchText(state.search);
export const getSearchPageSelected = state =>
  fromSearch.getSearchPageSelected(state.search);
export const getSearchNumberOfPages = state =>
  fromSearch.getSearchNumberOfPages(state.search);
export const getSearchLargePhotos = state =>
  fromSearch.getSearchLargePhotos(state.search);

export default rootReducer;
