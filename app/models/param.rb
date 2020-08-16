class Param < ApplicationRecord
  belongs_to :excercise, inverse_of: :params, optional: false
end
