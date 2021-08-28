# frozen_string_literal: true

class ConfirmationsController < Devise::ConfirmationsController
  skip_after_action :verify_authorized

  # def create TODO
  #   flash[:notice] = "Please confirm your email before continuing"
  #   super
  # end
end
