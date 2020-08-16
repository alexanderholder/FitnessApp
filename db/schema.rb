# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_15_075719) do

  create_table "blocks", force: :cascade do |t|
    t.string "name"
    t.string "style"
    t.integer "sets"
    t.integer "workout_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workout_id"], name: "index_blocks_on_workout_id"
  end

  create_table "excercises", force: :cascade do |t|
    t.string "name"
    t.integer "block_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["block_id"], name: "index_excercises_on_block_id"
  end

  create_table "params", force: :cascade do |t|
    t.string "movement"
    t.integer "set"
    t.string "metric"
    t.integer "value"
    t.integer "excercise_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["excercise_id"], name: "index_params_on_excercise_id"
  end

  create_table "training_templates", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "workouts", force: :cascade do |t|
    t.string "name"
    t.integer "day_number"
    t.integer "training_template_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["training_template_id"], name: "index_workouts_on_training_template_id"
  end

end
