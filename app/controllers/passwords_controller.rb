class PasswordsController < Devise::PasswordsController
  skip_after_action :verify_policy_scoped, :verify_authorized

  # def create TODO
  #   flash[:notice] = "Please confirm your email before continuing"
  #   super
  # end
end