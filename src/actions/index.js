// src/js/actions/index.js
import {
  CHANGE_DEPARTURE,
  LOAD_PLACES_ERROR,
  LOAD_PLACES_SUCCESS,
  LOAD_PLACES
} from "../constants/action-types";
import { CHANGE_ARRIVAL } from "../constants/action-types";

export function changeDeparture(payload) {
  return { type: CHANGE_DEPARTURE, payload };
}
export function changeArrival(payload) {
  return { type: CHANGE_ARRIVAL, payload };
}
export function loadPlaces() {
  // return function(dispatch) {
  //   const wait = time => new Promise(res => setTimeout(() => res(), time));
  //   return wait(5000).then(() => {
  //     dispatch(placesLoaded(placesMapping));
  //   });
  // };
  return { type: LOAD_PLACES };
}

export function placesLoaded(payload) {
  return { type: LOAD_PLACES_SUCCESS, payload };
}

export function placesLoadedFailed(payload) {
  return { type: LOAD_PLACES_ERROR, payload };
}
