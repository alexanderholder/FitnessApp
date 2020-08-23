# frozen_string_literal: true

# Currently only in use for excercsise 2 & 3 to update??
# Using create too

# Each excercise or set that belongs to a block.
# A excercise/movement for variable block
# Just represents a set for a fixed block
class ExcercisesController < ApplicationController
  def create
    @block = Block.find(params[:block_id])

    # try keep all excercises with the same details in the one block
    template_excercise = @block.excercises.first
    if template_excercise
      @excercise = template_excercise.dup
    else
      @excercise = @block.excercises.new(movement: 'New Excercise')
    end

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
      render 'index', notice: 'failed save'
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
