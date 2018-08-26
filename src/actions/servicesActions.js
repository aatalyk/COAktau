import {
  FETCH_SERVICES_REQUESTED,
  FETCH_SERVICES_SUCCEEDED,
  FETCH_SERVICES_FAILED,
  ADD_TO_MY_SERVICES,
  REMOVE_FROM_MY_SERVICES
} from "./types";

export const fetchServicesRequested = () => ({
  type: FETCH_SERVICES_REQUESTED
});

export const fetchServicesSucceded = items => ({
  type: FETCH_SERVICES_SUCCEEDED,
  items: items
});

export const fetchServicesFailed = error => ({
  type: FETCH_SERVICES_FAILED,
  error: error
});

export const addToMyServices = service => ({
  type: ADD_TO_MY_SERVICES,
  service
});

export const removeFromMyServices = service => ({
  type: REMOVE_FROM_MY_SERVICES,
  service
});
