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

ActiveRecord::Schema.define(version: 2020_08_22_135446) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "blocks", force: :cascade do |t|
    t.text "name"
    t.bigint "workout_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sets"
    t.text "style"
    t.integer "order"
    t.index ["workout_id"], name: "index_blocks_on_workout_id"
  end

  create_table "excercises", force: :cascade do |t|
    t.text "movement"
    t.text "measurement_metric"
    t.integer "measurement_value"
    t.text "weight_metric"
    t.integer "weight_value"
    t.bigint "block_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["block_id"], name: "index_excercises_on_block_id"
  end

  create_table "training_templates", force: :cascade do |t|
    t.text "name"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_training_templates_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.text "name"
    t.text "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "email", default: "", null: false
    t.text "encrypted_password", default: "", null: false
    t.text "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.text "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.text "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.datetime "locked_at"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "workouts", force: :cascade do |t|
    t.text "name"
    t.integer "day_number"
    t.bigint "training_template_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["training_template_id"], name: "index_workouts_on_training_template_id"
  end

  add_foreign_key "blocks", "workouts", on_delete: :cascade
  add_foreign_key "excercises", "blocks", on_delete: :cascade
  add_foreign_key "training_templates", "users", on_delete: :cascade
  add_foreign_key "workouts", "training_templates", on_delete: :cascade
end
