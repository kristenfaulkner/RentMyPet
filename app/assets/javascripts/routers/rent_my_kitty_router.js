RentMyKitty.Routers.RentMyKittyRouter = Backbone.Router.extend({
  routes: {
    "": "petsIndex",
    "pets/new" : "petsNew",
    "pets/:id" : "petsShow"
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

  petsShow: function (id) {
    var pet = RentMyKitty.Collections.pets.getOrFetch(id);

    var showView = new RentMyKitty.Views.PetsShowView({
      model: pet
    });

    this._swapView(showView);
  },

  _swapView: function (newView) {
    if (this.currentView) {
      this.currentView.remove();
    }

    $("#main").html(newView.render().$el);

    this.currentView = newView;
  }
});