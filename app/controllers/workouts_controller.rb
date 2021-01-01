class WorkoutsController < ApplicationController
  def create
    new_workout = Workout.create(workout_params)
    if new_workout.save
      render json: new_workout.attributes.as_json
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
