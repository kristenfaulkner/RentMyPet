class Image < ActiveRecord::Base

  validates :image_url, presence: true
  
  belongs_to(
    :pet,
    class_name: "Pet",
    primary_key: :id,
    foreign_key: :pet_id
  )
  
  
end