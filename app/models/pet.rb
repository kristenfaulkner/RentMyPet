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
  
  has_many(
    :images,
    class_name: "Image",
    primary_key: :id,
    foreign_key: :pet_id
  )
  def unavailable_dates
    unavailable = []
    self.pet_rental_requests.each do |rental| 
      dates = (rental.start_date...rental.end_date).to_a
      unavailable += dates
    end
    return unavailable
  end
  
end
