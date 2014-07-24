class CreatePets < ActiveRecord::Migration
  def change
    create_table :pets do |t|
      t.integer :owner_id, null: false
      t.string :name, null: false
      t.string :type, null: false
      t.integer :age
      t.string :color
      t.string :gender, null: false
      t.text :bio
      t.string :image_url, default: "http://cf.ltkcdn.net/socialnetworking/images/std/168646-150x150-Cat-Avatar-Primary.jpg"
      t.timestamps
    end
  end
end
