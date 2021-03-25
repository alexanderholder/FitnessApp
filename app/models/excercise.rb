# typed: strict
class Excercise < ApplicationRecord
  extend T::Sig

  belongs_to :block, inverse_of: :excercises, optional: false

  before_validation :confirm_or_create_sort_order

  sig { returns(Integer) }
  def confirm_or_create_sort_order
    return self.sort_order if self.sort_order.present?

    max_sort_order = self.block.excercises
      .map(&:sort_order)
      .compact
      .max || 0

    self.sort_order = max_sort_order + 1
  end
end
