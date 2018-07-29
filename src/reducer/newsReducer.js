import { FETCH_NEWS_REQUESTED, FETCH_NEWS_SUCCEEDED, FETCH_NEWS_FAILED } from '../actions';

const initialState = {
  newsItems: [],
  isLoading: false,
  error: '',
};

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_REQUESTED:
      return { ...state, isLoading: true };
    case FETCH_NEWS_SUCCEEDED:
      return { ...state, newsItems: action.newsItems };
    case FETCH_NEWS_FAILED:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
