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
  
    # def overlapping_pending_requests
 #      CatRentalRequest.find_by_sql([
 #        "SELECT
 #           *
 #         FROM
 #           cat_rental_requests
 #         WHERE
 #           (? BETWEEN start_date AND end_date
 #         OR
 #           ? BETWEEN start_date AND end_date)
 #         AND
 #           cat_id = ?
 #         AND
 #           id != ?
 #         AND status = 'PENDING'
 #           ", self.start_date, self.end_date, self.cat_id, self.id
 #        ])
 #    end
 #
 #    def overlapping_requests
 #      CatRentalRequest.find_by_sql([
 #        "SELECT
 #           *
 #         FROM
 #           cat_rental_requests
 #         WHERE
 #           (? BETWEEN start_date AND end_date
 #         OR
 #           ? BETWEEN start_date AND end_date)
 #         AND
 #           cat_id = ?
 #         AND
 #           id != ?
 #        AND status = 'APPROVED'
 #           ", self.start_date, self.end_date, self.cat_id, self.id
 #        ])
 #    end
  
    # def overlapping_approved_requests
    #   if overlapping_requests
    #     errors.add(:overlap, "Overlapping Approved Rentals")
    #   end
    # end
  # end
end
