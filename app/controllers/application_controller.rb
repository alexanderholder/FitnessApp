# typed: true
class ApplicationController < ActionController::Base
  include Pundit
  extend T::Sig

  before_action :authenticate_user!
  # after_action :verify_authorized

  # this could be nil if you aren't logged in
  # if your controller will only be used by logged in users, it should descend from AuthenticatedController
  sig { overridable.returns(T.nilable(TrainingTemplate)) }
  def current_training_template
    @current_template ||= if session[:training_template_id]
      current_user.training_templates.find(session[:training_template_id])
    else
      current_user.training_templates&.first
    end
  end
  delegate :id, to: :current_training_template, prefix: true, allow_nil: true

  def pundit_user
    UserContext.new(current_user, current_training_template)
  end

  class UserContext
    attr_reader :user, :current_training_template

    def initialize(user, current_training_template)
      @user                      = user
      @current_training_template = current_training_template
    end
  end
end
