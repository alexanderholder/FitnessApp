export const initialState = {
  selected_template: 1,
  dark_theme: true,
  user: { user_id: 1, signed_in: true },
  templates: [
    { id: 1, name: "Crossfit", length: 5, user_id: 1 },
    { id: 2, name: "Body Building", length: 7, user_id: 1 },
    { id: 3, name: "Strength", length: 7, user_id: 2 }
  ],
  workouts: [
    { id: 1, training_template_id: 1, name: "EMOM", day_number: 1 },
    { id: 2, training_template_id: 1, name: "AMRAP", day_number: 2 }
  ],
  excercises: [
    { id: 1, workout_id: 1, movement: "Clean & Jerk", measurement_metric: null, measurement_value: null, weight_metric: null, weight_value: null },
    { id: 2, workout_id: 1, movement: "Snatch", measurement_metric: null, measurement_value: null, weight_metric: null, weight_value: null },
    { id: 3, workout_id: 2, movement: "Box Jumps", measurement_metric: null, measurement_value: null, weight_metric: null, weight_value: null },
    { id: 4, workout_id: 2, movement: "Squat", measurement_metric: null, measurement_value: null, weight_metric: null, weight_value: null }
  ]
}