# frozen_string_literal: true

# typed: true
class ApplicationController < ActionController::Base
  extend T::Sig
  include Pundit

  before_action :doorkeeper_authorize!, if: :is_mobile_request?
  before_action :authenticate_user!, if: :is_web_request?
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: %i[index update destroy]

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  # this could be nil if you aren't logged in
  # if your controller will only be used by logged in users, it should descend from AuthenticatedController
  sig { overridable.returns(T.nilable(TrainingTemplate)) }
  def current_training_template
    @current_template ||= current_user.training_templates.find_by(id: session[:training_template_id])
    @current_template ||= current_user.training_templates&.first
  end
  delegate :id, to: :current_training_template, prefix: true, allow_nil: true

  def current_user
    return current_resource_owner if doorkeeper_token

    super
  end

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

  private

  def user_not_authorized
    flash[:alert] = 'You are not authorized to perform this action.'
    redirect_to(request.referer || root_path)
  end

  def is_mobile_request?
    doorkeeper_token.present?
  end

  def is_web_request?
    doorkeeper_token.nil?
  end

  def current_resource_owner
    User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end
end
