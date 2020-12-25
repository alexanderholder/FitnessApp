// Template
export const getTemplatesState = store => store.templates

export const getTemplatesByUserId = (store, id) =>
  getTemplatesState(store).filter(template => template.user_id == id)

export const getTemplateById = (store, id) =>
  getTemplatesState(store).find(template => template.id == id)

// Workouts
export const getWorkoutsState = store =>
  store.workouts.filter(workout => workout.training_template_id == store.selected_template)

export const getWorkoutsByDayNumberFilter = (store, dayNumber) =>
  getWorkoutsState(store).filter(workout => workout.day_number == dayNumber)

export const getWorkoutById = (store, id) =>
  getWorkoutsState(store).find(workout => workout.id == id)

// Blocks
export const getBlocksState = store => store.blocks

export const getBlocksByWorkoutId = (store, id) =>
  getBlocksState(store).filter(block => block.workout_id == id)

// Excercises
export const getExcercisesState = store => store.excercises

export const getExcercisesByBlockIds = (store, ids) =>
  getExcercisesState(store).filter(excercise => ids.includes(excercise.block_id))

export const getExcerciseById = (store, id) =>
  getExcercisesState(store).find(excercise => excercise.id == id)
