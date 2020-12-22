import { createSlice } from '@reduxjs/toolkit'
import initialState from '../initialState'

console.log(initialState)

export const templateSlice = createSlice({
  name: "template",
  initialState: initialState,
  reducers: {}
})

export const {} = templateSlice.actions

export default templateSlice.reducer