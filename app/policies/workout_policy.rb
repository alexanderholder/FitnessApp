class WorkoutPolicy < ApplicationPolicy
  class Scope
    def initialize(user, scope)
      raise Pundit::NotAuthorizedError, "must be logged in" unless user
      @user  = user
      @scope = scope
    end

    def resolve
      scope.where(training_template_id: user.current_training_template.id)
    end

    private

    attr_reader :user, :scope
  end

  attr_reader :user, :workout

  def initialize(user, workout)
    raise Pundit::NotAuthorizedError, "must be logged in" unless user
    @user = user
    @workout = workout
  end

  def bulk_create_sessions?
    true
  end

  def create?
    true
  end

  def read?
    true
  end

  def update?
    true
  end

  def destroy?
    true
  end

  def copy?
    true
  end
end