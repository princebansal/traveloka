import { CHANGE_DEPARTURE } from "../constants/action-types";
import placesMapping from "../testData";
import { changeArrival } from "../actions";
import uuidv1 from "uuid";

export function checkArrivalOnDepartureChangeMiddleware({
  getState,
  dispatch
}) {
  return function(next) {
    return function(action) {
      // do your stuff
      if (action.type === CHANGE_DEPARTURE) {
        if (
          placesMapping[action.payload.departure].indexOf(getState().arrival) <
          0
        ) {
          const id = uuidv1();
          dispatch(changeArrival({ arrival: "None", id }));
        }
      }
      return next(action);
    };
  };
}
