class TrainingTemplatesController < ApplicationController
  def index
    @training_templates = TrainingTemplate.all
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

    if @training_template.save
      redirect_to @training_template
    else
      render 'new'
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
