class Excercise < ApplicationRecord
  belongs_to :block, inverse_of: :excercises, optional: false

  has_many :params, inverse_of: :excercise, dependent: :destroy
end
