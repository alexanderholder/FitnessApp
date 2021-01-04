# frozen_string_literal: true

# Each excercise or set that belongs to a block.
# A excercise/movement for variable block
# Just represents a set for a fixed block
class ExcercisesController < ApplicationController
  def create
    new_excercise = Excercise.create(excercise_params)
    if new_excercise.save
      render json: new_excercise.attributes.as_json
    else
      head :bad_request
    end
  end

  def update
    excercise = Excercise.find(params[:id])

    if excercise.update(excercise_params)
      render json: excercise.attributes.as_json
    else
      head :bad_request
    end
  end

  def destroy
    excercise = Excercise.find(params[:id])

    if excercise.destroy
      head 202
    else
      head :bad_request
    end
  end

  private

  def excercise_params
    params.require(:excercise).permit(:block_id, :movement, :measurement_metric, :measurement_value, :weight_metric, :weight_value)
  end
end
