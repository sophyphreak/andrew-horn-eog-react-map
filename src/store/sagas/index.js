import ApiErrors from "./ApiErrors";
import WeatherSagas from "./Weather";
import DroneSagas from "./Drone";

export default [...ApiErrors, ...WeatherSagas, ...DroneSagas];
