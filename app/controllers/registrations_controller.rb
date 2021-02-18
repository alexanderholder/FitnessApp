class RegistrationsController < Devise::RegistrationsController
  def create
    flash[:notice] = "Please confirm your email before continuing"
    super
  end
end