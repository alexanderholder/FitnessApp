class Progression < ApplicationRecord
  belongs_to :session_progression, inverse_of: :progressions, optional: false
end
