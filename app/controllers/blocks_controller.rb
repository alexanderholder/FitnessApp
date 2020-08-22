class BlocksController < ApplicationController
  def create
    @workout = Workout.find(params[:workout_id])
    @block = @workout.blocks.create(name: "New Block")

    if @block.save
      redirect_to workout_path(@block.workout_id)
    else
      render 'new'
    end
  end

  def update
    @block = Block.find(params[:id])

    if excercise_params
      @excercise = Excercise.find(excercise_params[:id])
      @excercise.update(excercise_params)
    end

    if @block.update(block_params)
      redirect_to workout_path(@block.workout_id)
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
    params.require(:block).permit(:name, :day_number, :sets)
  end

  def excercise_params
    if params[:excercise]
      params.require(:excercise).permit(:id, :movement, :measurement_metric, :measurement_value, :weight_metric, :weight_value)
    end
  end
end
