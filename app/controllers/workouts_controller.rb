class WorkoutsController < ApplicationController
  def index
    @initial_state = initial_state
    respond_to do |format|
      format.html { render "index" }
    end
  end

  def initial_state
    training_templates = TrainingTemplate.where(user: current_user.id)
    workouts = Workout.where(training_template_id: training_templates.ids)
    blocks = Block.where(workout_id: workouts.ids)
    excercises = Excercise.where(block_id: blocks.ids)

    {
      user: { user_id: current_user.id, signed_in: true, selected_template: training_templates.first.id },
      templates: training_templates,
      workouts: workouts,
      blocks: blocks,
      excercises: excercises
    }
  end

  def show
    @workout = Workout.find(params[:id])
    @blocks = @workout.blocks
  end

  def new
    @workout = Workout.new(training_template_id: params[:training_template_id])
  end

  def edit
    @workout = Workout.find(params[:id])
  end

  def create
    @workout = Workout.new(workout_params)

    if @workout.save
      redirect_to training_template_path(@workout.training_template_id)
    else
      render 'new'
    end
  end

  def update
    @workout = Workout.find(params[:id])

    if @workout.update(workout_params)
      redirect_to @workout
    else
      render 'edit'
    end
  end

  def destroy
    @workout = Workout.find(params[:id])
    @workout.destroy

    redirect_to training_template_path(@workout.training_template_id)
  end

  private

  def workout_params
    params.require(:workout).permit(:name, :day_number, :training_template_id)
  end
end
