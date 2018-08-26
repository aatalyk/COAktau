import { ADD_TO_MY_SERVICES, REMOVE_FROM_MY_SERVICES } from "../actions";

const initialState = [];

export const myServicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_MY_SERVICES:
      return [...state, action.service];
    case REMOVE_FROM_MY_SERVICES:
      return [...state].filter(item => item !== action.service);
    default:
      return state;
  }
};
