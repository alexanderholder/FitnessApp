class BlocksController < ApplicationController
  def index
    @blocks = Block.all
  end

  def show
    @block = Block.find(params[:id])
  end

  def new
    @block = Block.new
  end

  def edit
    @block = Block.find(params[:id])
  end

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

    if @block.update(block_params)
      redirect_to @block
    else
      render 'edit'
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
end
