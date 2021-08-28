class BlockPolicy < ApplicationPolicy
  class Scope
    def initialize(user, scope)
      raise Pundit::NotAuthorizedError, 'must be logged in' unless user

      @user  = user
      @scope = scope
    end

    def resolve
      scope.where(workout_id: user.current_training_template.workouts.ids)
    end

    private

    attr_reader :user, :scope
  end

  attr_reader :user, :block

  def initialize(user, block)
    raise Pundit::NotAuthorizedError, 'must be logged in' unless user

    super
    @user = user
    @block = block
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
