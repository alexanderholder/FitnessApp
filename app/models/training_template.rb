class TrainingTemplate < ApplicationRecord
  belongs_to :user, inverse_of: :training_templates, optional: false

  has_many :workouts, inverse_of: :training_template, dependent: :destroy

  validates :name, :presence => true
end
