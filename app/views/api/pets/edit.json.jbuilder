  json.extract! @pet, :id, :owner_id, :name, :age, :color, :gender, :gender, :image_url, :bio, :animal, :address, :city, :state, :zipcode, :lat, :lng


  json.images @images do |image|
    json.image_url image.image_url
    json.id image.id
  end
