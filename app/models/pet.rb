class Pet < ActiveRecord::Base
  
  validates :name, :age, :color, :gender, presence: true
  validates_numericality_of :age, on: :create
  validates_inclusion_of :gender, in: ["Male", "Female"]

  has_many(:cat_rental_requests, dependent: :destroy)
  
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
    primary_key: :id
  )
  
  has_many(
  :requesters,
  class_name: "User",
  through: :pet_rental_requests,
  source: :requester_id
  )

end
