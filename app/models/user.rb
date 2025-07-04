# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :trackable, :lockable, :timeoutable,
         :confirmable

  has_many :access_grants,
           class_name: 'Doorkeeper::AccessGrant',
           foreign_key: :resource_owner_id,
           dependent: :delete_all # or :destroy if you need callbacks

  has_many :access_tokens,
           class_name: 'Doorkeeper::AccessToken',
           foreign_key: :resource_owner_id,
           dependent: :delete_all # or :destroy if you need callbacks

  has_many :training_templates, inverse_of: :user, dependent: :destroy
  has_many :workouts, inverse_of: :user, through: :training_templates, dependent: :destroy
  has_many :blocks, inverse_of: :user, through: :training_templates, dependent: :destroy
  has_many :excercises, inverse_of: :user, through: :training_templates, dependent: :destroy
  has_many :session_progressions, inverse_of: :user, dependent: :destroy
  has_many :progressions, through: :session_progressions, dependent: :destroy
end
