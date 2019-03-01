import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import state from './mockState.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(state);

export default store;
