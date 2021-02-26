class WorkoutPolicy < ApplicationPolicy
  class Scope
    def initialize(user, scope)
      raise Pundit::NotAuthorizedError, "must be logged in" unless user
      @user  = user
      @scope = scope
    end

    def resolve
      scope.where(training_template_id: user.training_templates.ids)
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

  def create?
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