// src/js/reducers/index.js
import {
  CHANGE_DEPARTURE,
  CHANGE_ARRIVAL,
  LOAD_PLACES_SUCCESS,
  LOAD_PLACES_ERROR
} from "../constants/action-types";

const initialState = {
  departure: "None",
  arrival: "None",
  placesMapping: {
    None: []
  },
  placesMappingStatus: true
};

function rootReducer(state = initialState, action) {
  if (action.type === CHANGE_DEPARTURE) {
    return Object.assign({}, state, {
      departure: action.payload.departure
    });
  } else if (action.type === CHANGE_ARRIVAL) {
    return Object.assign({}, state, {
      arrival: action.payload.arrival
    });
  } else if (action.type === LOAD_PLACES_SUCCESS) {
    return Object.assign({}, state, {
      placesMapping: action.payload,
      placesMappingStatus: true
    });
  } else if (action.type === LOAD_PLACES_ERROR) {
    return Object.assign({}, state, {
      placesMapping: [],
      placesMappingStatus: false
    });
  }
  return state;
}

export default rootReducer;
