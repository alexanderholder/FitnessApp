import { createSlice } from '@reduxjs/toolkit'
import initialState from '../initialState'

export const workoutSlice = createSlice({
  name: 'workouts',
  initialState: initialState,
  reducers: {
    addWorkout: state => {
      state.push({})
    },
    addExcercise: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.find(workout => workout.id == id).excercises.push(
        { }
      )
    },
    removeExcercise: state => {
      state.value -= 1
    }
  }
})

export const { addExcercise, removeExcercise } = workoutSlice.actions

export default workoutSlice.reducer