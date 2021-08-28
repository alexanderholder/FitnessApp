# typed: strict

# This is the container for a set of movments to be done on a day or part day.
# For Crossfit this could be multiple movements for one workout, or;
# traditional trainning it could just be the weight and reps for your squat workout.
class Block < ApplicationRecord
  extend T::Sig

  belongs_to :workout, inverse_of: :blocks, optional: false

  has_one :user, inverse_of: :block

  has_many :excercises, inverse_of: :block, dependent: :destroy

  before_validation :confirm_or_create_sort_order
  before_validation :confirm_or_create_name

  sig { void }
  def confirm_or_create_sort_order
    self.order = set_default_sort_order
  end

  sig { void }
  def confirm_or_create_name
    return if name.present?

    self.name = "Block #{max_sort_order + 1}"
  end

  sig { returns(Integer) }
  def set_default_sort_order
    return order if order.present?

    self.order = max_sort_order + 1
  end

  sig { returns(Integer) }
  def max_sort_order
    max_sort_order = workout.blocks
                            .map(&:order)
                            .compact
                            .max || 0
  end
end
