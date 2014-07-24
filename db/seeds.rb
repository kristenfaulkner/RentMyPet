# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Pet.create( name: "Cat1", owner_id: 1, animal: "Cat", age: 5, color: "black", gender: "M", bio: "This is my bio" )
Pet.create( name: "Cat2", owner_id: 1, animal: "Cat", age: 5, color: "Red", gender: "F", bio: "This is my bio"   )
Pet.create( name: "Cat3", owner_id: 1, animal: "Cat", age: 5, color: "white", gender: "M", bio: "This is my bio" )
Pet.create( name: "Cat4", owner_id: 1, animal: "Cat", age: 10, color: "Gray", gender: "F", bio: "This is my bio" )
Pet.create( name: "Cat5", owner_id: 2, animal: "Cat", age: 7, color: "yellow", gender: "M", bio: "This is my bio")
Pet.create( name: "Cat6", owner_id: 2, animal: "Cat", age: 2, color: "black", gender: "F", bio: "This is my bio" )
Pet.create( name: "Cat7", owner_id: 2, animal: "Cat", age: 8, color: "gray", gender: "M", bio: "This is my bio"  )


PetRentalRequest.create(pet_id: 1, requester_id: 1, start_date: Date.today.next_month, end_date: Date.tomorrow.next_year)

PetRentalRequest.create(pet_id: 2, requester_id: 1, start_date: Date.today.next_week, end_date: Date.today.next_month)
PetRentalRequest.create(pet_id: 3, requester_id: 2, start_date: Date.today, end_date: Date.today.next_week)
PetRentalRequest.create(pet_id: 4, requester_id: 2, start_date: Date.today.next_week, end_date: Date.today.next_month)