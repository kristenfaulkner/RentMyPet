RentMyKitty.Collections.Pets = Backbone.Collection.extend({
  model: RentMyKitty.Models.Pet,
  
  url: "/api/pets",

  comparator: 'age',

  getOrFetch: function (id) {
    var pets = this;
    var pet;
    if (pet = this.get(id)) {
      pet.fetch();
    } else {
      pet = new RentMyKitty.Models.Pet({ id: id });
      pet.fetch({
        success: function () { pets.add(pet); }
      });
    }
    return pet;
  }
  
});