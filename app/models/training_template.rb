class TrainingTemplate < ApplicationRecord
  has_many :workouts, inverse_of: :training_template, dependent: :destroy
end
