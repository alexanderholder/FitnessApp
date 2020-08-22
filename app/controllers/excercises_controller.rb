# Currently only in use for excercsise 2 & 3 to update??
# Using create too

class ExcercisesController < ApplicationController
  def create
    @block = Block.find(params[:block_id])
    @excercise = @block.excercises.new(movement: "New Excercise")

    if @excercise.save
      redirect_to workout_path(@excercise.block.workout_id)
    else
      render 'new'
    end
  end

  def update
    @excercise = Excercise.find(params[:id])

    if @excercise.update(excercise_params)
      redirect_to workout_path(@excercise.block.workout_id)
    else
      render 'index', notice: "failed save"
    end
  end

  def destroy
    @excercise = Excercise.find(params[:id])
    @excercise.destroy

    redirect_to workout_path(@excercise.block.workout_id)
  end

  private
  def excercise_params
    params.require(:excercise).permit(:movement, :measurement_metric, :measurement_value, :weight_metric, :weight_value)
  end
end
