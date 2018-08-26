import { FETCH_ABOUT_US_SUCCEEDED, FETCH_ABOUT_US_FAILED } from "../actions";

const initialState = {
  aboutData: null,
  error: ""
};

export const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ABOUT_US_SUCCEEDED:
      return {
        ...state,
        aboutData: action.aboutData
      };
    case FETCH_ABOUT_US_FAILED:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
