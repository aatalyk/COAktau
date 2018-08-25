import { createLogic } from "redux-logic";

import {
  FETCH_ABOUT_US_REQUESTED,
  fetchAboutUsSucceeded,
  fetchAboutUsFailed
} from "../actions";
import { fetch } from "../config";

const fetchAboutLogic = createLogic({
  type: FETCH_ABOUT_US_REQUESTED,
  process: async (_, dispatch, done) => {
    try {
      const items = await fetch("about");
      const aboutData = !!items && items.length > 0 ? items[0] : {};
      dispatch(fetchAboutUsSucceeded(aboutData));
    } catch (error) {
      dispatch(fetchAboutUsFailed(error));
    }
    done();
  }
});

export const aboutLogic = [fetchAboutLogic];
