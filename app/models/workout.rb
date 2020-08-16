class Workout < ApplicationRecord
  belongs_to :training_template, inverse_of: :training_days, optional: false

  has_many :blocks, inverse_of: :training_day, dependent: :destroy
end
