class SessionsController < Devise::SessionsController
  skip_after_action :verify_policy_scoped, :verify_authorized

  def destroy
    session.delete(:training_template_id)
    super
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end