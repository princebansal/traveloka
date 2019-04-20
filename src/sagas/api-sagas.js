import { takeEvery, call, put } from "redux-saga/effects";
import placesMapping from "../testData";
import { placesLoaded, placesLoadedFailed } from "../actions";

export default function* watcherSaga() {
  yield takeEvery("LOAD_PLACES", workerSaga);
}

function* workerSaga() {
  try {
    const payload = yield call(loadPlaces);
    yield put(placesLoaded(payload));
  } catch (e) {
    yield put(placesLoadedFailed(e));
  }
}
function loadPlaces() {
  //   return fetch("https://jsonplaceholder.typicode.com/posts").then(response =>
  //     response.json()
  //   );
  const wait = time =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        reject();
      }, time)
    );
  return wait(5000)
    .then(() => {
      return placesMapping;
    })
    .catch(e => {
      throw e;
    });
}
