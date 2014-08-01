class AddLatLngToPets < ActiveRecord::Migration
  def change
    add_column :pets, :lat, :float
    add_column :pets, :lng, :float  
  end
end
