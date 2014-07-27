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
  
  
    def overlapping_rentals(newlyApprovedRental)
      pending = PetRentalRequest.all.select({|rental| rental.status == "Pending"})
      pending.each do |rental|
        if rental.start_date.between?(newRental.start_date, newRental.end_date) || 
           rental.end_date.between?(newRental.start_date, newRental.end_date)
           rental.overlapping = true
        end  
      end
    end
    
    def unavailable_dates
      unavailable = []
      PetRentalRequests.all.each do |rental| 
        dates = (rental.start_Date...rental.end_date)
        unavailable.push(dates)
      end
      return unavailable
    end
    
end
