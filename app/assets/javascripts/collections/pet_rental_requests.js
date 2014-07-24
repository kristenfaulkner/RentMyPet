RentMyKitty.Collections.PetRentalRequests = Backbone.Collection.extend({
  model: RentMyKitty.Models.Pet,
  url: "/api/pets",

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