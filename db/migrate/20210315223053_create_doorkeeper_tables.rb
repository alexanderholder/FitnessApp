# frozen_string_literal: true

class CreateDoorkeeperTables < ActiveRecord::Migration[6.1]
  def change
    create_table :oauth_applications do |t|
      t.string  :name,    null: false
      t.string  :uid,     null: false
      t.string  :secret,  null: false

      # Remove `null: false` if you are planning to use grant flows
      # that doesn't require redirect URI to be used during authorization
      # like Client Credentials flow or Resource Owner Password.
      t.text    :redirect_uri # , null: false
      t.string  :scopes,       null: false, default: ''
      t.boolean :confidential, null: false, default: true
      t.timestamps             null: false
    end

    add_index :oauth_applications, :uid, unique: true

    create_table :oauth_access_grants do |t|
      t.references :resource_owner,  null: false
      t.references :application,     null: false
      t.string   :token,             null: false
      t.integer  :expires_in,        null: false
      t.text     :redirect_uri,      null: false
      t.datetime :created_at,        null: false
      t.datetime :revoked_at
      t.string   :scopes, null: false, default: ''
    end

    add_index :oauth_access_grants, :token, unique: true
    add_foreign_key(
      :oauth_access_grants,
      :oauth_applications,
      column: :application_id
    )

    create_table :oauth_access_tokens do |t|
      t.references :resource_owner, index: true

      # Remove `null: false` if you are planning to use Password
      # Credentials Grant flow that doesn't require an application.
      t.references :application # ,    null: false

      # If you use a custom token generator you may need to change this column
      # from string to text, so that it accepts tokens larger than 255
      # characters. More info on custom token generators in:
      # https://github.com/doorkeeper-gem/doorkeeper/tree/v3.0.0.rc1#custom-access-token-generator
      #
      # t.text :token, null: false
      t.string :token, null: false

      t.string   :refresh_token
      t.integer  :expires_in
      t.datetime :revoked_at
      t.datetime :created_at, null: false
      t.string   :scopes

      # The authorization server MAY issue a new refresh token, in which case
      # *the client MUST discard the old refresh token* and replace it with the
      # new refresh token. The authorization server MAY revoke the old
      # refresh token after issuing a new refresh token to the client.
      # @see https://tools.ietf.org/html/rfc6749#section-6
      #
      # Doorkeeper implementation: if there is a `previous_refresh_token` column,
      # refresh tokens will be revoked after a related access token is used.
      # If there is no `previous_refresh_token` column, previous tokens are
      # revoked as soon as a new access token is created.
      #
      # Comment out this line if you want refresh tokens to be instantly
      # revoked after use.
      t.string   :previous_refresh_token, null: false, default: ''
    end

    add_index :oauth_access_tokens, :token, unique: true
    add_index :oauth_access_tokens, :refresh_token, unique: true
    add_foreign_key(
      :oauth_access_tokens,
      :oauth_applications,
      column: :application_id
    )

    # Uncomment below to ensure a valid reference to the resource owner's table
    add_foreign_key :oauth_access_grants, :users, column: :resource_owner_id
    add_foreign_key :oauth_access_tokens, :users, column: :resource_owner_id
  end
end

# == 20210315223053 CreateDoorkeeperTables: migrating ===========================
# -- create_table(:oauth_applications)
#    -> 0.0073s
# -- add_index(:oauth_applications, :uid, {:unique=>true})
#    -> 0.0017s
# -- create_table(:oauth_access_grants)
#    -> 0.0074s
# -- add_index(:oauth_access_grants, :token, {:unique=>true})
#    -> 0.0025s
# -- add_foreign_key(:oauth_access_grants, :oauth_applications, {:column=>:application_id})
#    -> 0.0058s
# -- create_table(:oauth_access_tokens)
#    -> 0.0091s
# -- add_index(:oauth_access_tokens, :token, {:unique=>true})
#    -> 0.0016s
# -- add_index(:oauth_access_tokens, :refresh_token, {:unique=>true})
#    -> 0.0019s
# -- add_foreign_key(:oauth_access_tokens, :oauth_applications, {:column=>:application_id})
#    -> 0.0026s
# -- add_foreign_key(:oauth_access_grants, :users, {:column=>:resource_owner_id})
#    -> 0.0036s
# -- add_foreign_key(:oauth_access_tokens, :users, {:column=>:resource_owner_id})
#    -> 0.0018s
# == 20210315223053 CreateDoorkeeperTables: migrated (0.0461s) ==================
