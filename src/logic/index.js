import { createLogic } from 'redux-logic';

import { FETCH_FAQ_REQUESTED, fetchFAQSucceeded, fetchFAQFailed } from '../actions';
import { fetch } from '../config';

const authLogic = createLogic({
  type: FETCH_FAQ_REQUESTED,
  process: async ({ action }, dispatch, done) => {
    try {
      const items = await fetch(action.ref);
      console.warn(items);
      dispatch(fetchFAQSucceeded(items));
    } catch (error) {
      console.warn(error);
      dispatch(fetchFAQFailed(error));
    }
    done();
  },
});

export const logicArr = [authLogic];
