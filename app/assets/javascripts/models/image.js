RentMyKitty.Models.Image = Backbone.Model.extend({
  urlRoot: "api/images",

  initialize: function(options) {
    this.pet_id = options.pet_id;
    this.image_url = options.image_url;
  },

  pet: function() {
    return RentMyKitty.Collections.pets.getOrFetch(this.get('pet_id'), false);
  }
  
});