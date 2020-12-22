import { configureStore } from '@reduxjs/toolkit'

import templateReducer from './reducers/templateSlice'
import workoutsReducer from './reducers/workoutsSlice'

export default configureStore({
  reducer: {
    template: templateReducer,
    workouts: workoutsReducer
  }
})
