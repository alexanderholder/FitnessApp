class TrainingTemplate < ApplicationRecord
  belongs_to :user, inverse_of: :training_templates, optional: false

  has_many :workouts, inverse_of: :training_template, dependent: :destroy
  has_many :blocks, through: :workouts
  has_many :excercises, through: :blocks

  validates :name, :presence => true
end
