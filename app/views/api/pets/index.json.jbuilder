json.array! @pets do |pet| 
json.extract! pet, :id, :owner_id, :name, :age, :color, :gender, :gender, :image_url, :bio, :animal, :address, :city, :state, :zipcode


json.pet_rental_requests pet.pet_rental_requests do |pet_rental_request|
  json.start_date pet_rental_request.start_date
  json.end_date pet_rental_request.end_date
end

end