# frozen_string_literal: true

class TrainingTemplatesController < ApplicationController
  def create
    training_template = current_user.training_templates.new(training_template_params)

    authorize training_template

    if training_template.save
      session[:training_template_id] = training_template.id
      render json: training_template.attributes.as_json
    else
      head :bad_request
    end
  end

  def destroy
    training_template = policy_scope(TrainingTemplate).find(params[:id])

    authorize training_template

    if training_template.destroy
      head :accepted
    else
      head :bad_request
    end
  end

  private

  def training_template_params
    params.require(:training_template).permit(:name, :length)
  end
end
