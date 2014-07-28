RentMyKitty.Collections.Pets = Backbone.Collection.extend({
  model: RentMyKitty.Models.Pet,
  
  url: "/api/pets",

  comparator: 'age',

  getOrFetch: function (id, fetch) {
    if (_.isUndefined(fetch)) {
      fetch = true;
    }
    
    var pets = this;
    var pet;
    if (pet = this.get(id)) {
      if (fetch) {
        pet.fetch();
      }
    } else {
      pet = new RentMyKitty.Models.Pet({ id: id });
      pets.add(pet);

      if (fetch) {
        pet.fetch();
      }
    }
    return pet;
  }
  
});

RentMyKitty.Collections.pets = new RentMyKitty.Collections.Pets();
