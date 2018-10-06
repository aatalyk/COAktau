import { createLogic } from "redux-logic";

import {
  FETCH_SERVICES_REQUESTED,
  fetchServicesSucceded,
  fetchServicesFailed
} from "../actions";

const fetchServicesLogic = createLogic({
  type: FETCH_SERVICES_REQUESTED,
  process: ({ getState }, dispatch, done) => {
    const { lang } = getState().settings;
    fetch("http://soaktau.kz/api/v1.00/services")
      .then(response => response.json())
      .then(json => {
        const services = json[lang];
        dispatch(fetchServicesSucceded(services));
      })
      .catch(error => {
        dispatch(fetchServicesFailed(`${error}`));
      })
      .then(() => done());
  }
});

export const servicesLogic = [fetchServicesLogic];
