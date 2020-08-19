class User < ApplicationRecord
  has_many :training_templates, inverse_of: :user, dependent: :destroy

  validates :name, :presence => true
end
