import * as actions from "../actions";

const initialState = {
  latitude: null,
  longitude: null,
  timestamp: null,
  droneData: {}
};

const droneDataReceived = (state, action) => {
  const data = action.data.data;
  if (!data[0]) return state;
  const { timestamp, latitude, longitude } = data[0];
  return {
    ...state,
    latitude,
    longitude,
    timestamp,
    droneData: data
  };
};

const handlers = {
  [actions.DRONE_DATA_RECEIVED]: droneDataReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
