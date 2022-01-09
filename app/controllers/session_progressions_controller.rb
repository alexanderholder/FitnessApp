# frozen_string_literal: true

class SessionProgressionsController < ApplicationController
  def create
    ActiveRecord::Base.transaction do
      new_session_progression = current_user.session_progressions.create!(session_progression_params.slice(:name))
      authorize new_session_progression

      progressions = session_progression_params[:progressions].map do |progression_params|
        new_session_progression.progressions.new(progression_params)
        authorize new_session_progression
        new_session_progression.save!
      end

      render json: { session_progression: new_session_progression.attributes.as_json,
                     progressions: progressions.map(&:attributes).as_json }
    rescue ActiveRecord::StatementInvalid
      head :bad_request
    end
  end

  def bulk_create_sessions
    workout_progression_params = session_progression_params.slice(:workout_progressions)[:workout_progressions]
    excercise_name = workout_progression_params[:excercise]
    day_number = workout_progression_params[:day_number] + 1 # 0 => 6

    session_progression = SessionProgression.find(workout_progression_params[:progression_id])
    authorize session_progression

    ActiveRecord::Base.transaction do
      data = session_progression.progressions.each_with_index.map do |progression, index|
        # name: "#{excercise} Progression #{day_number}"
        workout = current_training_template.workouts.new(day_number: day_number + index * 7)
        authorize workout
        workout.save!

        block = workout.blocks.new
        authorize block
        block.save!

        excercise = block.excercises.new(movement: excercise_name, measurement_value: progression.sets_reps)
        authorize excercise
        excercise.save!

        { workout: workout.attributes.as_json, block: block.attributes.as_json,
          excercise: excercise.attributes.as_json }
      end

      render json: { workouts: data.map { |s| s[:workout] }, blocks: data.map do |s|
                                                                       s[:block]
                                                                     end, excercises: data.map do |s|
                                                                                        s[:excercise]
                                                                                      end }.as_json
    rescue ActiveRecord::StatementInvalid
      head :bad_request
    end
  end

  def destroy
    session_progression = policy_scope(SessionProgression).find(params[:id])

    authorize session_progression

    if session_progression.destroy
      head :accepted
    else
      head :bad_request
    end
  end

  private

  def session_progression_params
    params.require(:session_progression).permit(
      :name,
      progressions: %i[week set reps percent rir rpe],
      workout_progressions: %i[excercise progression_id day_number]
    )
  end
end
