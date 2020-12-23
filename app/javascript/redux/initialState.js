const initialState = {
  template: { name: "Crossfit", length: 5 },
  workouts: [
    { id: 1, name: "EMOM", day_number: 1 },
    { id: 2, name: "AMRAP", day_number: 2 }
  ],
  excercises: [
    { id: 1, workout_id: 1, name: "Clean & Jerk" },
    { id: 2, workout_id: 1, name: "Snatch" },
    { id: 3, workout_id: 2, name: "Box Jumps" },
    { id: 4, workout_id: 2, name: "Squat" }
  ]
}