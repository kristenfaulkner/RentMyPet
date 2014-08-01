RentMyKitty.Routers.RentMyKittyRouter = Backbone.Router.extend({
  routes: {
    "": "petsIndex",
    "pets/new" : "petsNew",
    "pets/:id" : "petsShow",
    "pets/:id/edit" : "petsEdit"
  },

  petsIndex: function () {

    var petsIndexView = new RentMyKitty.Views.PetsIndexView({
      collection: RentMyKitty.Collections.pets
    });
    RentMyKitty.Collections.pets.fetch();
    this._swapView(petsIndexView);
  },

  petsNew: function () {
    var newPet = new RentMyKitty.Models.Pet();
    var newView = new RentMyKitty.Views.PetsNewView({
      model: newPet
    });
    this._swapView(newView);
  },
  
  petsEdit: function(id) {
    var pet = RentMyKitty.Collections.pets.getOrFetch(id);
    var newView = new RentMyKitty.Views.PetsEditView({
      model: pet
    });
    this._swapView(newView);
  },
  
  petsShow: function (id) {
    var pet = RentMyKitty.Collections.pets.getOrFetch(id);
    var showView = new RentMyKitty.Views.PetsShowView({
      model: pet
    });
    this._swapView(showView);
  },

  // rentalRequestNew: function(id) {
//     var pet = RentMyKitty.Collections.pets.getOrFetch(id);
//     var newRequest = new RentMyKitty.Models.PetRentalRequest({ pet: pet });
//     var newView = new RentMyKitty.Views.PetRentalRequestNew({
//       model: newRequest
//     });
//     this._swapView(newView);
//   },
//
//   rentalRequestIndex: function(id) {
//     var pet = RentMyKitty.Collections.pets.getOrFetch(id);
//     var newRequest = new RentMyKitty.Views.PetRentalRequestsIndex({
//       collection: pet.petRentalRequests()
//     });
//     this._swapView(newRequest);
//   },
  
  _swapView: function (newView) {
    if (this.currentView) {
      this.currentView.remove();
    }

    $("#main").html(newView.render().$el);

    this.currentView = newView;
  }
});