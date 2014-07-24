class CreatePetRentalRequests < ActiveRecord::Migration
  def change
    create_table :pet_rental_requests do |t|
      t.integer :pet_id, null: false
      t.integer :requester_id, null: false
      t.date  :start_date, null: false
      t.date  :end_date, null: false
      t.string :status, default: "Pending", null: false
      t.timestamps
    end
  end
end
