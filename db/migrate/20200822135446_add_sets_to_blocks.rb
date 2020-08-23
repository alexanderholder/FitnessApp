# frozen_string_literal: true

class AddSetsToBlocks < ActiveRecord::Migration[5.2]
  def change
    change_table :blocks do |t|
      t.integer :sets
      t.text :style
      t.integer :order
    end
  end
end
