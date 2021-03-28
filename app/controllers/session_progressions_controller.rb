class SessionProgressionsController < ApplicationController
  def create
    new_session_progression = current_user.session_progressions.new(session_progression_params)
    authorize new_session_progression

    if new_session_progression.save
      render json: new_session_progression.attributes.as_json
    else
      head :bad_request
    end
  end

  def update
    session_progression = policy_scope(SessionProgression).find(params[:id])

    authorize session_progression

    if session_progression.update(session_progression_params)
      render json: session_progression.attributes.as_json
    else
      head :bad_request
    end
  end

  def destroy
    session_progression = policy_scope(SessionProgression).find(params[:id])

    authorize session_progression

    if session_progression.destroy
      head 202
    else
      head :bad_request
    end
  end

  private

  def session_progression_params
    params.require(:session_progression).permit(:name, :progressions)
  end
end
