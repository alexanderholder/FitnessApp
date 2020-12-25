class CalenderController < ApplicationController
  def inital_state
    training_templates = TrainingTemplate.where(user: current_user.id)
    workouts = Workout.where(training_template_id: training_templates.ids)
    blocks = Block.where(workout_id: workouts.ids)
    excercises = Excercise.where(block_id: blocks.ids)

    data = {
      selected_template: training_templates.first.id,
      user: { user_id: current_user.id, signed_in: true },
      templates: training_templates,
      workouts: workouts,
      blocks: blocks,
      excercises: excercises
    }

    render json: Oj.dump(data.to_json)
  end
end

# const initialState = {
#   selected_template: 1,
#   dark_theme: true,
#   user: { user_id: 1, signed_in: true },
#   templates: [
#     { id: 1, name: "Crossfit", length: 5, user_id: 1 },
#     { id: 2, name: "Body Building", length: 7, user_id: 1 },
#     { id: 3, name: "Strength", length: 7, user_id: 2 }
#   ],
#   workouts: [
#     { id: 1, training_template_id: 1, name: "EMOM", day_number: 1 },
#     { id: 2, training_template_id: 1, name: "AMRAP", day_number: 2 }
#   ],
#   blocks: [
#     { id; 1, name: "yeet", sets: 1, style: "Fixed", order: 1, workout_id: 1 }
#   ]
#   excercises: [
#     { id: 1, block_id: 1, movement: "Clean & Jerk", measurement_metric: null, measurement_value: null, weight_metric: null, weight_value: null },
#     { id: 2, block_id: 1, movement: "Snatch", measurement_metric: null, measurement_value: null, weight_metric: null, weight_value: null },
#     { id: 3, block_id: 2, movement: "Box Jumps", measurement_metric: null, measurement_value: null, weight_metric: null, weight_value: null },
#     { id: 4, block_id: 2, movement: "Squat", measurement_metric: null, measurement_value: null, weight_metric: null, weight_value: null }
#   ]
# }

# => Excercise(id: integer, movement: text, measurement_metric: text, measurement_value: integer, weight_metric: text, weight_value: integer, block_id: integer, created_at: datetime, updated_at: datetime)
# 2.7.1 :005 > Block
#  => Block(id: integer, name: text, sets: integer, style: text, order: integer, workout_id: integer, created_at: datetime, updated_at: datetime)
# 2.7.1 :006 > Workout
#  => Workout(id: integer, name: text, day_number: integer, training_template_id: integer, created_at: datetime, updated_at: datetime)