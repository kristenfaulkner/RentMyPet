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

require 'test_helper'

class PetRentalRequestTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
