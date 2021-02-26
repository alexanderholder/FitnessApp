class BlocksController < ApplicationController
  def create
    new_block = current_training_template.blocks.new(block_params)
    authorize new_block

    if new_block.save
      render json: new_block.attributes.as_json
    else
      head :bad_request
    end
  end

  def copy
    existing_block = policy_scope(Block).find(params[:id])
    new_block = existing_block.deep_clone include: :excercises
    new_block.workout_id = block_params[:workout_id]
    new_block.favourite = false

    authorize new_block

    if new_block.save
      excercises = new_block.excercises

      render json: {
        block: new_block.attributes.as_json,
        excercises: new_block.excercises.flat_map { |e| e.attributes.as_json }
      }
    else
      head :bad_request
    end
  end

  def update
    block = policy_scope(Block).find(params[:id])

    authorize block

    if block.update(block_params)
      render json: block.attributes.as_json
    else
      head :bad_request
    end
  end

  def destroy
    block = policy_scope(Block).find(params[:id])

    authorize block

    if block.destroy
      head 202
    else
      head :bad_request
    end
  end

  private

  def block_params
    params.require(:block).permit(:workout_id, :name, :day_number, :sets, :style, :order, :favourite)
  end
end
