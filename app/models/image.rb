# == Schema Information
#
# Table name: images
#
#  id         :integer          not null, primary key
#  image_url  :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#  pet_id     :integer
#

class Image < ActiveRecord::Base

  validates :image_url, presence: true
  
  belongs_to(
    :pet,
    class_name: "Pet",
    primary_key: :id,
    foreign_key: :pet_id
  )
  
  
end
