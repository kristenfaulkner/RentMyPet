# == Schema Information
#
# Table name: pet_rental_requests
#
#  id           :integer          not null, primary key
#  pet_id       :integer          not null
#  requester_id :integer          not null
#  status       :string(255)      default("Pending"), not null
#  created_at   :datetime
#  updated_at   :datetime
#  start_date   :datetime
#  end_date     :datetime
#

class PetRentalRequest < ActiveRecord::Base

    validates :status, presence: true
    # validate :repeat_requests

    belongs_to(:pet)


    belongs_to(
      :requester,
      class_name: "User",
      foreign_key: :requester_id,
      primary_key: :id
    )

    # def repeat_requests
    #      query_string = <<-SQL
    #        SELECT
    #           *
    #         FROM
    #           pet_rental_requests
    #         WHERE
    #           pet_id = ?
    #         AND
    #           start_date = ?
    #         AND
    #           end_date = ?
    #         AND
    #           id != ?
    #         AND
    #         requester_id = ?
    #           overlapping = PetRentalRequest.find_by_sql([query_string, self.pet_id, self.start_date, self.end_date, self.id, self.requester_id])
    #        SQL
    #        if !repeats.empty?
    #           errors[:dates] << "You have already submitted a request for these dates"
    #        end
    # end

    def destroy_overlapping
      query_string = <<-SQL
        SELECT
           *
         FROM
         pet_rental_requests
         WHERE
           ? <= end_date
         AND
           ? >= start_date
         AND
           ? = pet_id
         AND
           id != ?
         AND
         status = 'Pending'
         SQL

          overlapping = PetRentalRequest.find_by_sql([query_string, self.start_date, self.end_date, self.pet_id, self.pet_id])
          puts overlapping.map {|request| request.id }
          overlapping.each {|request| request.destroy}
      end

end
