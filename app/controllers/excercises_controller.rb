# frozen_string_literal: true

class ExcercisesController < ApplicationController
  def create
    new_excercise = Excercise.new(excercise_params)

    authorize new_excercise

    if new_excercise.save
      render json: new_excercise.attributes.as_json
    else
      head :bad_request
    end
  end

  def update
    excercise = policy_scope(Excercise).find(params[:id])

    authorize excercise

    if excercise.update(excercise_params)
      render json: excercise.attributes.as_json
    else
      head :bad_request
    end
  end

  def destroy
    excercise = policy_scope(Excercise).find(params[:id])

    authorize excercise

    if excercise.destroy
      head 202
    else
      head :bad_request
    end
  end

  private

  def excercise_params
    params.require(:excercise).permit(:sort_order, :block_id, :movement, :measurement_metric, :measurement_value, :weight_metric, :weight_value)
  end
end
