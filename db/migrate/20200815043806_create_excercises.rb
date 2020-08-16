class CreateExcercises < ActiveRecord::Migration[5.2]
  def change
    create_table :excercises do |t|
      t.string :name
      t.references(:block, null: false, foreign_key: { on_delete: :cascade }, index: true)

      t.timestamps
    end
  end
end
