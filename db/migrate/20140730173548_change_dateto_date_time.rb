class ChangeDatetoDateTime < ActiveRecord::Migration
  def change
    remove_column :pet_rental_requests, :start_date, :date
    add_column :pet_rental_requests, :start_date, :datetime

    remove_column :pet_rental_requests, :end_date, :date
    add_column :pet_rental_requests, :end_date, :datetime
  end
end
