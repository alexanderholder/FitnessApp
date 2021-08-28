# frozen_string_literal: true

class CalendarPolicy < ApplicationPolicy
  attr_reader :user

  def initialize(user)
    raise Pundit::NotAuthorizedError, 'must be logged in' unless user

    super
  end

  def index?
    true
  end

  def show?
    true
  end
end
