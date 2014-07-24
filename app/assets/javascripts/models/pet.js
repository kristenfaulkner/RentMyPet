RentMyKitty.Models.Pet = Backbone.Model.extend({
  urlRoot: "/api/pets",
  
  petRentalRequests: function () {
    this._petRentalRequests = this._petRentalRequests ||
      new RentMyKitty.Collections.PetRentalRequest([], { pet: this });
    return this._petRentalRequests;
  },
  
  parse: function (payload) {
    if (payload.pet_rental_requests) {
      this.pet_rental_requests().set(payload.pet_rental_requests, { parse: true });
      delete payload.pet_rental_requests;
    }

    if (payload.owner) {
      this.owner().set(payload.owner, { parse: true });
      delete payload.owner;
    }
    
    return payload;
  },
  
  owner: function() {
    this._owner = this._owner || new RentMyKitty.Models.User({}, { id: this.owner_id, pet: this })
    return this._owner;
  }
});