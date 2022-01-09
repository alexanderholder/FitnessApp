# frozen_string_literal: true

class AddProgressionTable < ActiveRecord::Migration[6.1]
  def change
    create_table :progressions do |t|
      t.references(:session_progression, null: false, foreign_key: { on_delete: :cascade }, index: true)
      t.integer :week
      t.integer :set 
      t.integer :reps 
      t.integer :percent 
      t.integer :rir 
      t.integer :rpe

      t.timestamps
    end
  end
end

# == 20210425035743 AddProgressionTable: migrating ==============================
# -- create_table(:progressions)
#    -> 0.0070s
# == 20210425035743 AddProgressionTable: migrated (0.0070s) =====================
