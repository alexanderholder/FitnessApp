class TrainingTemplatePolicy < ApplicationPolicy
  class Scope
    def initialize(user, scope)
      raise Pundit::NotAuthorizedError, 'must be logged in' unless user

      @user  = user
      @scope = scope
    end

    def resolve
      scope.where(user_id: user.user.id)
    end

    private

    attr_reader :user, :scope
  end

  attr_reader :user, :training_template

  def initialize(user, training_template)
    raise Pundit::NotAuthorizedError, 'must be logged in' unless user

    super
    @user = user
    @training_template = training_template
  end

  def show?
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
end
