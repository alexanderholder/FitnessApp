class SessionProgression < ApplicationRecord
  belongs_to :user, inverse_of: :session_progressions, optional: false

  validates :name, :presence => true
  validates :progressions, :presence => true
end
