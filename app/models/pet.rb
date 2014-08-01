# == Schema Information
#
# Table name: pets
#
#  id         :integer          not null, primary key
#  owner_id   :integer          not null
#  name       :string(255)      not null
#  animal     :string(255)      not null
#  age        :integer
#  color      :string(255)
#  gender     :string(255)      not null
#  bio        :text
#  image_url  :string(255)      default("http://cf.ltkcdn.net/socialnetworking/images/std/168646-150x150-Cat-Avatar-Primary.jpg")
#  created_at :datetime
#  updated_at :datetime
#  address    :string(255)
#  city       :string(255)
#  state      :string(255)
#  zipcode    :string(255)
#

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
