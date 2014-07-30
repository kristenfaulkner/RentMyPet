RentMyKitty.Models.PetRentalRequest = Backbone.Model.extend({
  urlRoot: "api/pet_rental_requests",

  initialize: function(options) {
    this.pet_id = options.pet_id;
  },
  
  requester: function() {
    this._requester = this._requester || new RentMyKitty.Models.User({}, { id: this.requester_id})
    return this._requester;
  },

  pet: function() {
    // this._pet = this._pet || new RentMyKitty.Models.Pet({ id: this.pet_id})
    // return this._pet;
    return RentMyKitty.Collections.pets.getOrFetch(this.get('pet_id'), false);
  },
  
  parse: function(payload) {
    payload.start_date = new Date(payload.start_date);
    payload.end_date = new Date(payload.end_date);
    return payload;
  }


});