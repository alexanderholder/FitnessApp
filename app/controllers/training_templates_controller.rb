class TrainingTemplatesController < ApplicationController
  def create
    @training_template = TrainingTemplate.new(training_template_params)
    @training_template.user_id = current_user.id

    if @training_template.save
      render json: @training_template.attributes.as_json
    else
      head :bad_request
    end
  end

  def destroy
    @training_template = TrainingTemplate.find(params[:id])

    if @training_template.destroy
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
