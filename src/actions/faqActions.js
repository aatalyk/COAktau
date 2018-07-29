import { FETCH_FAQ_REQUESTED, FETCH_FAQ_SUCCEEDED, FETCH_FAQ_FAILED } from './types';

export const fetchFAQRequested = () => ({
  type: FETCH_FAQ_REQUESTED,
});

export const fetchFAQSucceeded = (items) => ({
  type: FETCH_FAQ_SUCCEEDED,
  items,
});

export const fetchFAQFailed = (error) => ({
  type: FETCH_FAQ_FAILED,
  error,
});
