class CreateWorkouts < ActiveRecord::Migration[5.2]
  def change
    create_table :workouts do |t|
      t.string :name
      t.integer :day_number
      t.references(:training_template, null: false, foreign_key: { on_delete: :cascade }, index: true)

      t.timestamps
    end
  end
end
