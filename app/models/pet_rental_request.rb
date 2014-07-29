class PetRentalRequest < ActiveRecord::Base

    validates :status, presence: true
    validate :repeat_requests
  
    belongs_to(:pet)
    
    
    belongs_to(
      :owner,
      class_name: "User",
      foreign_key: :owner_id,
      primary_key: :id
    )
  
    def repeat_requests
         repeats = PetRentalRequest.find_by_sql([
           "SELECT
              *
            FROM
              pet_rental_requests
            WHERE
              pet_id = ?
            AND
              start_date = ?
            AND
              end_date = ?
            AND
              id != ?
            AND
            requester_id = ?
              ", self.pet_id, self.start_date, self.end_date, self.id, self.requester_id
           ])
           if !repeats.empty?
              errors[:dates] << "You have already submitted a request for these dates"
           end
    end
    
    def destroy_overlapping
        overlapping = PetRentalRequest.find_by_sql([
          "SELECT
             *
           FROM
             pet_rental_requests
           WHERE
             (? BETWEEN start_date AND end_date
           OR
             ? BETWEEN start_date AND end_date)
           AND
             ? = pet_id
           AND
             ? != id
          AND status = 'Pending'
             ", self.start_date, self.end_date, self.pet_id, self.id
          ])
          puts overlapping
          overlapping.each { |request| request.destroy }
      end
    
end
