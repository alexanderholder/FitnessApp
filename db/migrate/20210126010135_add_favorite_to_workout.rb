# frozen_string_literal: true

# == 20210126010135 AddFavoriteToWorkout: migrating =============================
# -- add_column(:workouts, :favourite, :boolean, {:default=>false})
#    -> 0.0058s
# == 20210126010135 AddFavoriteToWorkout: migrated (0.0059s) ====================
class AddFavoriteToWorkout < ActiveRecord::Migration[6.1]
  def change
    add_column :workouts, :favourite, :boolean, default: false
  end
end
