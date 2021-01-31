# == 20210128045004 AddFavouriteToBlocks: migrating =============================
# -- add_column(:blocks, :favourite, :boolean, {:default=>false})
#    -> 0.1464s
# == 20210128045004 AddFavouriteToBlocks: migrated (0.1465s) ====================
class AddFavouriteToBlocks < ActiveRecord::Migration[6.1]
  def change
    add_column :blocks, :favourite, :boolean, default: false
  end
end
