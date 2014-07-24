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
  
    def overlapping_pending_requests
      PetRentalRequest.find_by_sql([
        "SELECT
           *
         FROM
           pet_rental_requests
         WHERE
           (? BETWEEN start_date AND end_date
         OR
           ? BETWEEN start_date AND end_date)
         AND
           pet_id = ?
         AND
           id != ?
         AND status = 'Pending'
           ", self.start_date, self.end_date, self.pet_id, self.id
        ])
    end

    def overlapping_requests
      PetRentalRequest.find_by_sql([
        "SELECT
           *
         FROM
           pet_rental_requests
         WHERE
           (? BETWEEN start_date AND end_date
         OR
           ? BETWEEN start_date AND end_date)
         AND
           pet_id = ?
         AND
           id != ?
        AND status = 'Approved'
           ", self.start_date, self.end_date, self.pet_id, self.id
        ])
    end

    def overlapping_approved_requests
      if overlapping_requests
        errors.add(:overlap, "Overlapping Approved Rentals")
      end
    end
end
