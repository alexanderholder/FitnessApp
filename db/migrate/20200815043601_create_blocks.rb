class CreateBlocks < ActiveRecord::Migration[5.2]
  def change
    create_table :blocks do |t|
      t.string :name
      t.string :style
      t.integer :sets
      t.references(:workout, null: false, foreign_key: { on_delete: :cascade }, index: true)

      t.timestamps
    end
  end
end
