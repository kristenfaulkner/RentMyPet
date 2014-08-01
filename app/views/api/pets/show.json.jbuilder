  json.extract! @pet, :id, :owner_id, :name, :age, :color, :gender, :gender, :image_url, :bio, :animal, :address, :city, :state, :zipcode, :lat, :lng


  json.pet_rental_requests @pet.pet_rental_requests do |pet_rental_request|
    json.start_date pet_rental_request.start_date
    json.end_date pet_rental_request.end_date
    json.status pet_rental_request.status
    json.requester pet_rental_request.requester.username
  end
  
  json.images @pet.images do |image|
    json.image image.image_url
  end