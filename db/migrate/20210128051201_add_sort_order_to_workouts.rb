# == 20210128051201 AddSortOrderToWorkouts: migrating ===========================
# -- add_column(:workouts, :sort_order, :integer)
#    -> 0.0052s
# == 20210128051201 AddSortOrderToWorkouts: migrated (0.0052s) ==================
class AddSortOrderToWorkouts < ActiveRecord::Migration[6.1]
  def change
    add_column :workouts, :sort_order, :integer
  end
end
