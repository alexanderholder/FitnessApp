# frozen_string_literal: true

# This is the container for a set of movments to be done on a day or part day.
# For Crossfit this could be multiple movements for one workout, or;
# traditional trainning it could just be the weight and reps for your squat workout.
class Block < ApplicationRecord
  belongs_to :workout, inverse_of: :blocks, optional: false

  has_many :excercises, inverse_of: :block, dependent: :destroy

  validates :style, inclusion: { in: %w[Variable Fixed] }

  def variable?
    style == 'Variable'
  end
end
