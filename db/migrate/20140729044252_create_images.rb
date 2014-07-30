class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :file_url, null: false
      t.timestamps
    end
  end
end
