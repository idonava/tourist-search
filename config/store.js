import { createStore } from 'redux';
import rootReducer from '../reducers';
import getMiddlewares from './middlewares';

const configureStore = preloadedState => {
  return createStore(rootReducer, preloadedState, getMiddlewares());
};

export default configureStore;
