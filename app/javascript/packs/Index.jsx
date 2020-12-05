// @flow
import React            from "react"
import App              from "../components/App"
import { render }       from "react-dom"
import { Provider }     from 'react-redux'
import { createStore }  from 'redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'


const workoutExcercises = ["Clean & Jerk", "Snatch"]
const workouts = [
  { id: 1, name: "EMOM", day_number: 1, excercises: workoutExcercises },
  { id: 2, name: "EMOM", day_number: 2, excercises: workoutExcercises }
]
const payload = {
  template_name: "Crossfit",
  template_length: 5,
  template_workouts: workouts
}

const counter = (state = 0, action) => {
  switch(action.type) {
     case 'INCREMENT':
       return state = state + 1

     case 'DECREMENT':
       return state = state -1
     default:
       return state
   }
}

const store = createStore(counter, payload)

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body
      ? document.body.appendChild(document.createElement("div"))
      : null
  )
})
