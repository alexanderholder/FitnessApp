class Excercise < ApplicationRecord
  belongs_to :block, inverse_of: :excercises, optional: false
end
