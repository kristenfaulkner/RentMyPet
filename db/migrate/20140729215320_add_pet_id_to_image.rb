class AddPetIdToImage < ActiveRecord::Migration
  def change
    add_column :images, :pet_id, :integer, presence: true
    rename_column :images, :file_url, :image_url
  end
end
