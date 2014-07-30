RentMyKitty.Collections.PetRentalRequests = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.pet = options.pet;
    this.pet_id = this.pet.id;
  },
  model: RentMyKitty.Models.PetRentalRequest,
  url: "/api/pet_rental_requests",

  comparator: 'status',
  getOrFetch: function (id) {
    var petRentalRequests = this;
    var petRentalRequest;
    if (petRentalRequest = this.get(id)) {
      petRentalRequest.fetch();
    } else {
      petRentalRequest = new RentMyKitty.Models.PetRentalRequest({ id: id });
      petRentalRequest.fetch({
        success: function () { petRentalRequestRentalRequests.add(petRentalRequest); }
      });
    }
    return petRentalRequest;
  }
});
