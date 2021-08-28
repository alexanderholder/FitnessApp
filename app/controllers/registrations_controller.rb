# frozen_string_literal: true

class RegistrationsController < Devise::RegistrationsController
  skip_after_action :verify_authorized

  def create
    flash[:notice] = 'Please confirm your email before continuing'
    super
  end
end
