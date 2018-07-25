import { FETCH_FAQ_REQUESTED, FETCH_FAQ_SUCCEEDED, FETCH_FAQ_FAILED } from '../actions';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAQ_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FAQ_SUCCEEDED:
      return {
        ...state,
        data: action.items,
        loading: false,
      };
    case FETCH_FAQ_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
