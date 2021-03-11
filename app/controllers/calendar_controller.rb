class CalendarController < ApplicationController
  def index
    @initial_state = initial_state

    respond_to do |format|
      format.html { render "index" }
    end
  end

  # TODO finish scoping
  def initial_state
    {
      user: {
        user_id: current_user.id,
        signed_in: true,
        selected_template: current_training_template.id
      },
      templates: policy_scope(TrainingTemplate),
      workouts: policy_scope(Workout),
      blocks: policy_scope(Block),
      excercises: policy_scope(Excercise)
    }
  end

  def show
    training_template = current_user.training_templates.find(params[:id])

    authorize training_template

    session[:training_template_id] = training_template.id

    render json: {
      template: training_template,
      workouts: training_template.workouts,
      blocks: training_template.blocks,
      excercises: training_template.excercises
    }
  end
end
