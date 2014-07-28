class Pet < ActiveRecord::Base
  
  validates :name, :age, :color, :gender, presence: true
  validates_numericality_of :age, on: :create
  validates_inclusion_of :gender, in: ["Male", "Female"]
  
  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :owner_id,
    primary_key: :id
  )
  
  has_many(
    :pet_rental_requests,
    class_name: "PetRentalRequest",
    foreign_key: :pet_id,
    primary_key: :id,
    dependent: :destroy
  )
  
  has_many(
  :requesters,
  class_name: "User",
  through: :pet_rental_requests,
  source: :requester_id
  )

  def destroy_overlapping_requests(newRental)
    pending = self.pet_rental_requests.select {|rental| rental.status == "Pending"}
    pending.each do |rental|
      if rental.start_date.between?(newRental.start_date, newRental.end_date) || 
         rental.end_date.between?(newRental.start_date, newRental.end_date)
         rental.destroy
      end  
    end
  end

  def unavailable_dates
    unavailable = []
    self.pet_rental_requests.each do |rental| 
      dates = (rental.start_Date...rental.end_date).to_a
      unavailable += dates
    end
    return unavailable
  end
  
end
