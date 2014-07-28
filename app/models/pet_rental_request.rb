class PetRentalRequest < ActiveRecord::Base

    validates :status, presence: true
    #validate :overlapping_approved_requests
  
    belongs_to(:pet)
    
    
    belongs_to(
      :owner,
      class_name: "User",
      foreign_key: :owner_id,
      primary_key: :id
    )
  
  
    
end
