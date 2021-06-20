class CalendarController < ApplicationController
  def index
    @initial_state = initial_state

    respond_to do |format|
      format.html { render "index" }
      format.json { render json: initial_state }
    end
  end

  def initial_state
    {
      user: {
        user_id: current_user.id,
        signed_in: true,
        selected_view: 'Session',
        selected_template: current_training_template.id
      },
      templates: policy_scope(TrainingTemplate),
      workouts: policy_scope(Workout).sort_by(&:day_number),
      blocks: policy_scope(Block).sort_by(&:order),
      excercises: policy_scope(Excercise).sort_by(&:sort_order),
      sessionProgressions: policy_scope(SessionProgression)
    }
  end

  def show
    training_template = current_user.training_templates.find(params[:id])

    authorize training_template

    session[:training_template_id] = training_template.id

    render json: {
      template: training_template,
      templates: policy_scope(TrainingTemplate),
      workouts: policy_scope(Workout).sort_by(&:day_number),
      blocks: policy_scope(Block).sort_by(&:order),
      excercises: policy_scope(Excercise).sort_by(&:sort_order)
    }
  end
end
