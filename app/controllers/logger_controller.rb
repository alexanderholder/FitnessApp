class LoggerController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  def log
    # puts params
  end
end