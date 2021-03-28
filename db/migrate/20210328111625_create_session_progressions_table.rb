class CreateSessionProgressionsTable < ActiveRecord::Migration[6.1]
  def change
    create_table :session_progressions do |t|
      t.text :name
      t.text :progressions
      t.references(:user, null: false, foreign_key: { on_delete: :cascade }, index: true)

      t.timestamps
    end
  end
end

# == 20210328111625 CreateSessionProgressionsTable: migrating ===================
# -- create_table(:session_progressions)
#    -> 0.0337s
# == 20210328111625 CreateSessionProgressionsTable: migrated (0.0337s) ==========
