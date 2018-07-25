import { SET_LANG } from '../actions';

const INITIAL_STATE = {
  lang: 'kaz',
};

export const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LANG:
      return {
        ...state,
        lang: action.lang,
      };
    default:
      return state;
  }
};
