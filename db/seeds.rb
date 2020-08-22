# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# user = User.create(name: 'Alex Holder')
training_template = TrainingTemplate.create(name: 'Plyo Basketball', user: User.first)
workouts = Workout.create(
  [
    { name: 'AM Jumping', day_number: 1, training_template: training_template },
    { name: 'PM Jumping', day_number: 1, training_template: training_template },
    { name: 'Legs', day_number: 2, training_template: training_template },
    { name: 'Legs', day_number: 3, training_template: training_template },
    { name: 'Legs', day_number: 4, training_template: training_template },
    { name: 'Legs', day_number: 5, training_template: training_template },
    { name: 'Legs', day_number: 8, training_template: training_template },
    { name: 'Legs', day_number: 9, training_template: training_template },
    { name: 'Legs', day_number: 10, training_template: training_template }
  ]
)
blocks = Block.create(
  [
    { name: "Box Jumps", workout: workouts.first },
    { name: "Squats", workout: workouts.first },
    { name: "EMOM", workout: workouts.first },
    { name: "Squats", workout: workouts.first },
    { name: "Squats", workout: workouts[1] },
    { name: "Squats", workout: workouts[2] },
    { name: "Squats", workout: workouts[3] },
    { name: "Squats", workout: workouts[4] },
    { name: "Squats", workout: workouts[5] },
    { name: "Squats", workout: workouts[6] },
    { name: "Squats", workout: workouts[7] }
  ]
)
Excercise.create(
  [
    { movement: "Box Jump", measurement_metric: "reps", measurement_value: "5", weight_metric: "none", weight_value: 0, block: blocks.first },
    { movement: "Back Squat", measurement_metric: "reps", measurement_value: "5", weight_metric: "percent", weight_value: 80, block: blocks.second },
    { movement: "Row", measurement_metric: "distance", measurement_value: "200", weight_metric: "none", weight_value: 0, block: blocks.third },
    { movement: "Box Jump", measurement_metric: "reps", measurement_value: "10", weight_metric: "none", weight_value: 0, block: blocks.third },
    { movement: "Power Clean", measurement_metric: "reps", measurement_value: "6", weight_metric: "kg", weight_value: 60, block: blocks.third }
  ]
)