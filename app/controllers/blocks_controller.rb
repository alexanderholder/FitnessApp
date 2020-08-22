class BlocksController < ApplicationController
  def create
    @workout = Workout.find(params[:workout_id])
    @block = @workout.blocks.new(block_params)

    if @block.save
      redirect_to workout_path(@block.workout_id)
    else
      render 'new'
    end
  end

  def update
    @block = Block.find(params[:id])
    @excercise = Excercise.find(excercise_params[:id])

    @excercise.update(excercise_params)

    if @block.update(block_params)
      redirect_to training_template_workout_path(@block.workout_id), notice: "Saved"
    else
      render 'index', notice: "failed save"
    end
  end

  def destroy
    @block = Block.find(params[:id])
    @block.destroy

    redirect_to workout_path(@block.workout_id)
  end

  private
  def block_params
    params.require(:block).permit(:name, :day_number)
  end

  def excercise_params
    params.require(:excercise).permit(:id, :movement, :measurement_metric, :measurement_value, :weight_metric, :weight_value)
  end
end
