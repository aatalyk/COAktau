import { createLogic } from 'redux-logic';

import { FETCH_FAQ_REQUESTED, fetchFAQSucceeded, fetchFAQFailed } from '../actions';
import { fetch } from '../config';

const authLogic = createLogic({
  type: FETCH_FAQ_REQUESTED,
  process: async (_, dispatch, done) => {
    try {
      const items = await fetch('coaktau');
      dispatch(fetchFAQSucceeded(items));
    } catch (error) {
      dispatch(fetchFAQFailed(error));
    }
    done();
  },
});

export const logicArr = [authLogic];
