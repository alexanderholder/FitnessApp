import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import workouts from "./workouts";

export default combineReducers({ workouts, visibilityFilter });
