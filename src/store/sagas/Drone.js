import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function* watchFetchDroneData() {
  const { error, data } = yield call(API.findDroneLocation);
  if (error) {
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
  yield put({ type: actions.DRONE_DATA_RECEIVED, data });
}

function* watchDroneDataReceived(action) {
  const { latitude, longitude } = action.data.data[0];
  const { error, data } = yield call(
    API.findLocationByLatLng,
    latitude,
    longitude
  );
  if (error) {
    console.log({ error });
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
  const location = data[0] ? data[0].woeid : false;
  if (!location) {
    yield put({ type: actions.API_ERROR });
    yield cancel();
    return;
  }
  yield put({ type: actions.WEATHER_ID_RECEIVED, id: location });
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.FETCH_DRONE_DATA, watchFetchDroneData),
    takeEvery(actions.DRONE_DATA_RECEIVED, watchDroneDataReceived)
  ]);
}

export default [watchAppLoad];
