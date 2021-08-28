# frozen_string_literal: true

# == 20210117120417 AddSortOrderToExcercises: migrating =========================
# -- add_column(:excercises, :sort_order, :integer)
#    -> 0.0163s
# == 20210117120417 AddSortOrderToExcercises: migrated (0.0164s) ================
class AddSortOrderToExcercises < ActiveRecord::Migration[6.1]
  def change
    add_column :excercises, :sort_order, :integer
  end
end
