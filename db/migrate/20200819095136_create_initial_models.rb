# frozen_string_literal: true

class CreateInitialModels < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.text :name

      t.timestamps
    end

    create_table :training_templates do |t|
      t.text :name
      t.integer :length
      t.references(:user, null: false, foreign_key: { on_delete: :cascade }, index: true)

      t.timestamps
    end

    create_table :workouts do |t|
      t.text :name
      t.integer :day_number
      t.references(:training_template, null: false, foreign_key: { on_delete: :cascade }, index: true)

      t.timestamps
    end

    create_table :blocks do |t|
      t.text :name
      t.integer :sets
      t.text :style
      t.integer :order
      t.references(:workout, null: false, foreign_key: { on_delete: :cascade }, index: true)

      t.timestamps
    end

    create_table :excercises do |t|
      t.text :movement
      t.text :measurement_metric
      t.integer :measurement_value
      t.text :weight_metric
      t.integer :weight_value
      t.references(:block, null: false, foreign_key: { on_delete: :cascade }, index: true)

      t.timestamps
    end
  end
end
