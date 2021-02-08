# typed: strict

# This is the container for a set of movments to be done on a day or part day.
# For Crossfit this could be multiple movements for one workout, or;
# traditional trainning it could just be the weight and reps for your squat workout.
class Block < ApplicationRecord
  extend T::Sig

  belongs_to :workout, inverse_of: :blocks, optional: false

  has_many :excercises, inverse_of: :block, dependent: :destroy

  validates :style, inclusion: { in: %w[Variable Fixed] }

  before_validation :confirm_or_create_sort_order

  sig { void }
  def confirm_or_create_sort_order
    self.order = self.set_default_sort_order
  end

  sig { returns(Integer) }
  def set_default_sort_order
    return self.order if self.order.present?

    max_sort_order = self.workout.blocks
      .map(&:order)
      .compact
      .max || 0

    max_sort_order + 1
  end

  sig { returns(T::Boolean)}
  def variable?
    style == 'Variable'
  end
end
