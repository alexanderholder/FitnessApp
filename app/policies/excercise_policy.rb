class ExcercisePolicy < ApplicationPolicy
  class Scope
    def initialize(user, scope)
      raise Pundit::NotAuthorizedError, 'must be logged in' unless user

      @user  = user
      @scope = scope
    end

    def resolve
      scope.where(block_id: user.current_training_template.blocks.ids)
    end

    private

    attr_reader :user, :scope
  end

  attr_reader :user, :excercise

  def initialize(user, excercise)
    raise Pundit::NotAuthorizedError, 'must be logged in' unless user

    super
    @user = user
    @excercise = excercise
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
