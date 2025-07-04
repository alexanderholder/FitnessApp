import { combineReducers } from "redux";
import blocks from "./blocksSlice";
import excercises from "./excercisesSlice";
import templates from "./templatesSlice";
import workouts from "./workoutsSlice";
import user from "./usersSlice";
import sessionProgressions from "./sessionProgressionsSlice";
import setsRepsSchemeList from "./setsRepsSchemeListSlice";
import excerciseList from "./excerciseListSlice";

export default combineReducers({
  workouts,
  blocks,
  excercises,
  templates,
  user,
  sessionProgressions,
  setsRepsSchemeList,
  excerciseList,
});
