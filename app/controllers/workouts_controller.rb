class WorkoutsController < ApplicationController
  def json
    render json: Oj.dump(Workout.all.to_json)
  end

  def index
    # TODO
    @workouts = Workout.all
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
