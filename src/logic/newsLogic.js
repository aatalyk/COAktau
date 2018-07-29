import { createLogic } from 'redux-logic';

import { FETCH_NEWS_REQUESTED, fetchNewsSucceeded, fetchNewsFailed } from '../actions';
import { database } from '../config';

const fetchNewsLogic = createLogic({
  type: FETCH_NEWS_REQUESTED,
  warnTimeout: 0,
  process: async (_, dispatch) => {
    database.ref('news').on(
      'value',
      (snapshot) => {
        const items = [];
        snapshot.forEach((child) => {
          const item = child.val();
          items.push(item);
        });
        dispatch(fetchNewsSucceeded(items));
      },
      (error) => {
        dispatch(fetchNewsFailed(error));
      },
    );
  },
});

export const newsLogic = [fetchNewsLogic];
