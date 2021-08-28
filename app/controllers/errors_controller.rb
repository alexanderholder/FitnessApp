# frozen_string_literal: true

class ErrorsController < ApplicationController
  skip_before_action :authenticate_user!

  # http://rubyjunky.com/cleaning-up-rails-4-production-logging.html
  def not_found
    unless user_signed_in?
      redirect_to new_user_session_path
      return
    end

    render file: 'public/404.html', status: :not_found, layout: false
  end
end
