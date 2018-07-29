import { createLogic } from 'redux-logic';

import { FETCH_FAQ_REQUESTED, fetchFAQSucceeded, fetchFAQFailed } from '../actions';
import { fetch } from '../config';
import { newsLogic } from './newsLogic';

const fetchFaqLogic = createLogic({
  type: FETCH_FAQ_REQUESTED,
  process: async (_, dispatch, done) => {
    try {
      const items = await fetch('faq');
      dispatch(fetchFAQSucceeded(items));
    } catch (error) {
      dispatch(fetchFAQFailed(error));
    }
    done();
  },
});

export const logicArr = [fetchFaqLogic, ...newsLogic];
