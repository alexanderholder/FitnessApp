# Currently not in use

class ExcercisesController < ApplicationController
  def create
    @workout = Workout.find(params[:workout_id])
    @excercise = @workout.excercises.new(excercise_params)

    if @excercise.save
      redirect_to workout_path(@excercise.workout_id)
    else
      render 'new'
    end
  end

  def update
    @excercise = Excercise.find(params[:id])

    if @excercise.update(excercise_params)
      redirect_to training_template_workout_path(@excercise.block.workout_id), notice: "Saved"
    else
      render 'index', notice: "failed save"
    end
  end

  def destroy
    @excercise = Excercise.find(params[:id])
    @excercise.destroy

    redirect_to workout_path(@excercise.workout_id)
  end

  private
  def excercise_params
    params.require(:excercise).permit(:movement, :measurement_metric, :measurement_value, :weight_metric, :weight_value)
  end
end
