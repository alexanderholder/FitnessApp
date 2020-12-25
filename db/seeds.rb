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
    { name: 'AM Jumping', day_number: 1, training_template_id: training_template.id },
    { name: 'PM Jumping', day_number: 1, training_template_id: training_template.id },
    { name: 'Legs', day_number: 2, training_template_id: training_template.id },
    { name: 'Legs', day_number: 3, training_template_id: training_template.id },
    { name: 'Legs', day_number: 4, training_template_id: training_template.id },
    { name: 'Legs', day_number: 5, training_template_id: training_template.id },
    { name: 'Legs', day_number: 8, training_template_id: training_template.id },
    { name: 'Legs', day_number: 9, training_template_id: training_template.id },
    { name: 'Legs', day_number: 10, training_template_id: training_template.id }
  ]
)
blocks = Block.create(
  [
    { name: "Box Jumps", workout_id: workouts.first.id },
    { name: "Squats", workout_id: workouts.first.id },
    { name: "EMOM", workout_id: workouts.first.id },
    { name: "Squats", workout_id: workouts.first.id },
    { name: "Squats", workout_id: workouts[1].id },
    { name: "Squats", workout_id: workouts[2].id },
    { name: "Squats", workout_id: workouts[3].id },
    { name: "Squats", workout_id: workouts[4].id },
    { name: "Squats", workout_id: workouts[5].id },
    { name: "Squats", workout_id: workouts[6].id },
    { name: "Squats", workout_id: workouts[7].id }
  ]
)
Excercise.create(
  [
    { movement: "Box Jump", measurement_metric: "reps", measurement_value: "5", weight_metric: "none", weight_value: 0, block_id: blocks.first.id },
    { movement: "Back Squat", measurement_metric: "reps", measurement_value: "5", weight_metric: "percent", weight_value: 80, block_id: blocks.second.id },
    { movement: "Row", measurement_metric: "distance", measurement_value: "200", weight_metric: "none", weight_value: 0, block_id: blocks.third.id },
    { movement: "Box Jump", measurement_metric: "reps", measurement_value: "10", weight_metric: "none", weight_value: 0, block_id: blocks.third.id },
    { movement: "Power Clean", measurement_metric: "reps", measurement_value: "6", weight_metric: "kg", weight_value: 60, block_id: blocks.third.id }
  ]
)