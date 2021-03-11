class SessionsPolicy
  attr_reader :user, :session

  def initialize(user, record)
    @user = user
    @record = record
  end
end
