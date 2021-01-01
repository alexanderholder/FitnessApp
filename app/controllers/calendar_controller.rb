class CalendarController < ApplicationController
  def index
    @initial_state = initial_state
    respond_to do |format|
      format.html { render "index" }
    end
  end

  def initial_state
    training_templates = TrainingTemplate.where(user: current_user.id)
    workouts = Workout.where(training_template_id: training_templates.ids)
    blocks = Block.where(workout_id: workouts.ids)
    excercises = Excercise.where(block_id: blocks.ids)

    {
      user: {
        user_id: current_user.id,
        signed_in: true,
        selected_template: training_templates.first.id },
      templates: training_templates,
      workouts: workouts,
      blocks: blocks,
      excercises: excercises
    }
  end
end
