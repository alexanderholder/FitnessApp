# typed: strict
class Workout < ApplicationRecord
  extend T::Sig

  belongs_to :training_template, inverse_of: :workouts, optional: false

  has_one :user, inverse_of: :workout

  has_many :blocks, inverse_of: :workout, dependent: :destroy

  validates :name, presence: true
  validates :day_number, presence: true

  before_validation :confirm_or_create_sort_order
  before_validation :confirm_or_create_name

  sig { void }
  def confirm_or_create_name
    return if name.present?

    self.name = "Session #{max_sort_order + 1}"
  end

  sig { void }
  def confirm_or_create_sort_order
    self.sort_order = set_default_sort_order
  end

  sig { returns(Integer) }
  def set_default_sort_order
    return sort_order if sort_order.present?

    self.sort_order = max_sort_order + 1
  end

  sig { returns(Integer) }
  def max_sort_order
    training_template.workouts.where(day_number: day_number)
                     .map(&:sort_order)
                     .compact
                     .max || 0
  end
end
