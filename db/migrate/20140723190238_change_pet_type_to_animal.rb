class ChangePetTypeToAnimal < ActiveRecord::Migration
  def change
    rename_column :pets, :type, :animal
  end
end
