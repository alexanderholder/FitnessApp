export const getWorkoutsState = store => store.template_workouts

export const getWorkoutsByDayNumberFilter = (store, dayNumber) =>
  getWorkoutsState(store).filter(workout => workout.day_number == dayNumber)

export const getWorkoutById = (store, id) =>
  getWorkoutsState(store).find(workout => workout.id == id)

export const getExcerciseById = (store, workoutId, excerciseId) =>
  getWorkoutsState(store).find(workout => workout.id == workoutId).excercises.find(excercise => excercise.id == excerciseId)
