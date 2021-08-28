# frozen_string_literal: true

class RemoveStyleFromBlock < ActiveRecord::Migration[6.1]
  def change
    remove_column :blocks, :style
  end
end

# == 20210428091233 RemoveStyleFromBlock: migrating =============================
# -- remove_column(:blocks, :style)
#    -> 0.0112s
# == 20210428091233 RemoveStyleFromBlock: migrated (0.0113s) ====================
