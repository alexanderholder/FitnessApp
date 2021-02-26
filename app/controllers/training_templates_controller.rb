class TrainingTemplatesController < ApplicationController
  def create
    training_template = current_user.training_templates.new(training_template_params)
    training_template.user_id = current_user.id

    authorize training_template

    if training_template.save
      current_user.update_column(current_training_template_id: training_template.id)
      render json: training_template.attributes.as_json
    else
      head :bad_request
    end
  end

  def destroy
    scoped_training_template = policy_scope(TrainingTemplate)
    training_template = scoped_training_template.find(params[:id])

    authorize training_template

    if training_template.destroy
      head 202
    else
      head :bad_request
    end
  end

  private

  def training_template_params
    params.require(:training_template).permit(:name, :length)
  end
end
