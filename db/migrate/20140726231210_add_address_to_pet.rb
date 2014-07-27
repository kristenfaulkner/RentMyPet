class AddAddressToPet < ActiveRecord::Migration
  def change
    add_column :pets, :address, :string
    add_column :pets, :city, :string
    add_column :pets, :state, :string
    add_column :pets, :zipcode, :string
  end
end

