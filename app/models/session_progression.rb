class SessionProgression < ApplicationRecord
  belongs_to :user, inverse_of: :session_progressions, optional: false

  has_many :progressions, inverse_of: :session_progression

  validates :name, presence: true
end
