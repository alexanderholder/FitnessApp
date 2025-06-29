# frozen_string_literal: true

class ProgressionPolicy < ApplicationPolicy
  class Scope
    def initialize(user, scope)
      raise Pundit::NotAuthorizedError, 'must be logged in' unless user

      @user  = user
      @scope = scope
    end

    def resolve
      scope.where(session_progression_id: user.user.session_progressions.ids)
    end

    private

    attr_reader :user, :scope
  end

  attr_reader :user, :progression

  def initialize(user, progression)
    raise Pundit::NotAuthorizedError, 'must be logged in' unless user

    super
    @user = user
    @progression = progression
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
