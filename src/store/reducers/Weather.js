import * as actions from "../actions";

const initialState = {
  loading: false,
  weatherId: null,
  name: "",
  temperature: "",
  weather_state_name: "",
  latitude: null,
  longitude: null,
  timestamp: null,
  droneData: {},
  weatherData: {}
};

const toF = c => (c * 9) / 5 + 32;

const startLoading = (state, action) => {
  return { ...state, loading: true };
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

const weatherIDReceived = (state, action) => {
  return { ...state, weatherId: action.id };
};

const weatherDataRecevied = (state, action) => {
  const { data } = action;
  if (!data["consolidated_weather"]) return state;
  const weather = data.consolidated_weather[0];
  const { weather_state_name, the_temp } = weather;
  const { title: name } = data;

  return {
    ...state,
    loading: false,
    temperatureinCelsius: the_temp,
    temperatureinFahrenheit: toF(the_temp),
    weather_state_name,
    name,
    weatherData: action.data
  };
};

const handlers = {
  [actions.FETCH_DRONE_DATA]: startLoading,
  [actions.DRONE_DATA_RECEIVED]: droneDataReceived,
  [actions.WEATHER_ID_RECEIVED]: weatherIDReceived,
  [actions.WEATHER_DATA_RECEIVED]: weatherDataRecevied
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
