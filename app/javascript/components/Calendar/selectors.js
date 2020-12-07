export const getWorkoutsState = store => store.template_workouts

// export const getWorkoutList = store =>
//   getWorkoutsState(store) ? getWorkoutsState(store).allIds : []

export const getWorkoutById = (store, id) =>
  getWorkoutsState(store) ? { ...getWorkoutsState(store).byIds[id], id } : {}

// export const getWorkouts = store =>
//   getWorkoutList(store).map(id => getWorkoutById(store, id))

export const getWorkoutsByDayNumberFilter = (store, dayNumber) =>
  getWorkoutsState(store).filter(workout => workout.day_number == dayNumber)

// export const getWorkoutsState = store => store.template_workouts

// export const getWorkoutList = store =>
//   getWorkoutsState(store) ? getWorkoutsState(store) : []

// export const getWorkoutByDay = (store, day_number) =>
//   getWorkoutsState(store) ? { ...getWorkoutsState(store).bydays[day_number], day_number } : {}

// export const getWorkouts = store =>
//   getWorkoutList(store).map(day_number => getWorkoutByDay(store, day_number))

export const getWorkoutByIdFilter = (store, id) =>
  getWorkoutsState(store).filter(workout => workout.id == id)
