class CreateParams < ActiveRecord::Migration[5.2]
  def change
    create_table :params do |t|
      t.string :movement
      t.integer :set
      t.string :metric
      t.integer :value
      t.references(:excercise, null: false, foreign_key: { on_delete: :cascade }, index: true)

      t.timestamps
    end
  end
end
