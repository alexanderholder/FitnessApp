class TrainingTemplatesController < ApplicationController
  skip_before_action :verify_authenticity_token, :only => [:data]

  def data
    tt = TrainingTemplate.create(name: params["data"])
    Rails.logger("yeet") if tt.valid?
  end

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
    @training_template.length ||= 5 # TODO: add length in UI

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
    @training_template.destroy

    redirect_to training_templates_path
  end

  private

  def training_template_params
    params.require(:training_template).permit(:name)
  end
end
