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
        selected_template: current_training_template
      },
      templates: current_user.training_templates,
      workouts: current_training_template.workouts,
      blocks: current_training_template.blocks,
      excercises: current_training_template.excercises
    }
  end

  def show
    training_template = current_user.training_templates.find(params[:id])

    authorize training_template

    # current_user.update_columns(current_training_template_id: training_template.id)
    session[:training_template_id] = training_template.id

    render json: {
      template: training_template,
      workouts: training_template.workouts,
      blocks: training_template.blocks,
      excercises: training_template.excercises
    }
  end
end
