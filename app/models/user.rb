class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :trackable, :lockable, :timeoutable,
         :confirmable

  has_many :training_templates, inverse_of: :user, dependent: :destroy

  validates :name, :presence => true
end
