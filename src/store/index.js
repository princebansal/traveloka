import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { checkArrivalOnDepartureChangeMiddleware } from "../middleware";
//import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas/api-sagas";

const initialiseSagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(
    applyMiddleware(
      checkArrivalOnDepartureChangeMiddleware,
      initialiseSagaMiddleware
    )
  )
);

initialiseSagaMiddleware.run(apiSaga);

export default store;
