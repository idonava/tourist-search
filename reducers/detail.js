import { DETAIL_SET_ID, DETAIL_RESET } from '../actions';

const defaultState = {
  id: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case DETAIL_SET_ID:
      return { id: action.payload.id };

    case DETAIL_RESET:
      return { ...defaultState };

    default:
      return state;
  }
}

export const getDetailId = state => state.id;
