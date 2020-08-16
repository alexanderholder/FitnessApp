class Workout < ApplicationRecord
  belongs_to :training_template, inverse_of: :workouts, optional: false

  has_many :blocks, inverse_of: :workout, dependent: :destroy

  validates :name, :presence => true
  validates :day_number, :presence => true
end
