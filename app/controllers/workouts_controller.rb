# frozen_string_literal: true

class WorkoutsController < ApplicationController
  def create
    new_workout = current_training_template.workouts.new(workout_params)
    authorize new_workout

    if new_workout.save
      render json: new_workout.attributes.as_json
    else
      head :bad_request
    end
  end

  def copy
    existing_workout = policy_scope(Workout).find(params[:id])

    new_workout = existing_workout.deep_clone include: { blocks: :excercises },
                                              except: [:favourite,
                                                       { blocks: [:favourite] }]
    new_workout.day_number = workout_params[:day_number]
    new_workout.favourite = false

    authorize new_workout

    if new_workout.save
      blocks = new_workout.blocks
      excercises = blocks.flat_map(&:excercises)

      render json: {
        workout: new_workout.attributes.as_json,
        blocks: new_workout.blocks.flat_map { |b| b.attributes.as_json },
        excercises: excercises.flat_map { |e| e.attributes.as_json }
      }
    else
      head :bad_request
    end
  end

  def update
    workout = policy_scope(Workout).find(params[:id])

    authorize workout

    if workout.update(workout_params)
      render json: workout.attributes.as_json
    else
      head :bad_request
    end
  end

  def destroy
    workout = policy_scope(Workout).find(params[:id])

    authorize workout

    if workout.destroy
      head :accepted
    else
      head :bad_request
    end
  end

  private

  def workout_params
    params.require(:workout).permit(:name, :day_number, :favourite, :training_template_id)
  end
end
