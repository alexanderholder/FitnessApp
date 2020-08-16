class Block < ApplicationRecord
  belongs_to :workout, inverse_of: :blocks, optional: false

  has_many :excercises, inverse_of: :block, dependent: :destroy
end
