// Workouts
export const getWorkoutsState = store =>
  store.workouts.filter(workout => workout.template_id == store.selected_template)

export const getWorkoutsByDayNumberFilter = (store, dayNumber) =>
  getWorkoutsState(store).filter(workout => workout.day_number == dayNumber)

export const getWorkoutById = (store, id) =>
  getWorkoutsState(store).find(workout => workout.id == id)

// Excercises
export const getExcercisesState = store => store.excercises

export const getExcerciseByWorkoutId = (store, id) =>
  getExcercisesState(store).filter(excercise => excercise.workout_id == id)

export const getExcerciseById = (store, id) =>
  getExcercisesState(store).find(excercise => excercise.id == id)

// Template
export const getTemplatesState = store => store.templates

export const getTemplatesByUserId = (store, id) =>
  getTemplatesState(store).filter(template => template.user_id == id)

export const getTemplateById = (store, id) =>
  getTemplatesState(store).find(template => template.id == id)

// User
export const getUserState = store => store.user_details
