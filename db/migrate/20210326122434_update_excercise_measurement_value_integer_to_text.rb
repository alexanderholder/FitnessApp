# frozen_string_literal: true

class UpdateExcerciseMeasurementValueIntegerToText < ActiveRecord::Migration[6.1]
  def change
    change_table :excercises do |t|
      t.change :measurement_value, :text
    end
  end
end

# == 20210326122434 UpdateExcerciseMeasurementValueIntegerToText: migrating =====
# -- change_table(:excercises)
#    -> 0.0213s
# == 20210326122434 UpdateExcerciseMeasurementValueIntegerToText: migrated (0.0213s)
