const initialState = {
  template: { name: "Crossfit", length: 5 },
  workouts: [
    { id: 1, name: "EMOM", day_number: 1, excercises: [
      { id: 1, name: "Clean & Jerk" },
      { id: 2, name: "Snatch" }
    ]},
    { id: 2, name: "AMRAP", day_number: 2, excercises: [
      { id: 3, name: "Box Jumps" },
      { id: 4, name: "Squat" }
    ]}
  ]
}
