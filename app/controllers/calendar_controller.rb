# frozen_string_literal: true

class CalendarController < ApplicationController
  skip_after_action :verify_policy_scoped # TODO: remove the funny scoping

  def index
    @initial_state = initial_state

    respond_to do |format|
      format.html { render 'index' }
      format.json { render json: initial_state }
    end
  end

  def initial_state
    {
      user: {
        user_id: current_user.id,
        signed_in: true,
        selected_view: 'Session',
        selected_template: current_training_template&.id
      },
      templates: current_user.training_templates,
      workouts: current_user.workouts.sort_by(&:day_number),
      blocks: current_user.blocks.sort_by(&:order),
      excercises: current_user.excercises,
      sessionProgressions: current_user.session_progressions
      # progressions: current_user.progressions
    }
  end

  def show
    training_template = current_user.training_templates.find(params[:id])

    authorize training_template

    session[:training_template_id] = training_template.id

    head :ok
  end
end
