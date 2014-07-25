RentMyKitty.Models.PetRentalRequest = Backbone.Model.extend({
  urlRoot: "api/pet_rental_request",


  requester: function() {
    this._requester = this._requester || new RentMyKitty.Models.User({}, { id: this.requester_id})
    return this._requester;
  },

  pet: function() {
    this._pet = this._pet || new RentMyKitty.Models.Pet({}, { id: this.pet_id})
    return this._pet;
  }

});