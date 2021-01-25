class WorkoutsController < ApplicationController
  def create
    new_workout = Workout.create(workout_params)

    if new_workout.save
      render json: new_workout.attributes.as_json
    else
      head :bad_request
    end
  end

  def copy
    existing_workout = Workout.find(params[:id])
    new_workout = existing_workout.deep_clone include: { blocks: :excercises }
    new_workout.day_number = workout_params[:day_number]

    if new_workout.save
      blocks = new_workout.blocks
      excercises = blocks.flat_map(&:excercises)

      output = {
        workout: new_workout.attributes.as_json,
        blocks: new_workout.blocks.flat_map { |b| b.attributes.as_json },
        excercises: excercises.flat_map { |e| e.attributes.as_json }
      }

      puts output

      render json: output
    else
      head :bad_request
    end
  end

  def update
    workout = Workout.find(params[:id])

    if workout.update(workout_params)
      render json: workout.attributes.as_json
    else
      head :bad_request
    end
  end

  def destroy
    workout = Workout.find(params[:id])

    if workout.destroy
      head 202
    else
      head :bad_request
    end
  end

  private

  def workout_params
    params.require(:workout).permit(:name, :day_number, :training_template_id)
  end
end
