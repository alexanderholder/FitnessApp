class TrainingTemplatesController < ApplicationController
  def index
    @training_templates = TrainingTemplate.where(user_id: current_user.id)
  end

  def show
    @training_template = TrainingTemplate.find(params[:id])
    @workouts = @training_template.workouts
  end

  def new
    @training_template = TrainingTemplate.new
  end

  def edit
    @training_template = TrainingTemplate.find(params[:id])
  end

  def create
    @training_template = TrainingTemplate.new(training_template_params)
    @training_template.user_id = current_user.id

    if @training_template.save
      render json: @training_template.attributes.as_json
    else
      head :bad_request
    end
  end

  def update
    @training_template = TrainingTemplate.find(params[:id])

    if @training_template.update(training_template_params)
      redirect_to @training_template
    else
      render 'edit'
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
