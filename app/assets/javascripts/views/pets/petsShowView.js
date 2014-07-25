RentMyKitty.Views.PetsShowView = Backbone.View.extend({
  
  template: JST['pets/show'],
  
  initialize: function() {
    var that = this;
        debugger
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.petRentalRequests(), "sync", this.render);
    this.listenTo(this.model.petRentalRequests(), "add", this.render);
    this.listenTo(this.model.petRentalRequests(), "remove", this.render);
    var request = new RentMyKitty.Models.PetRentalRequest({pet: this.model});
    var requestView = new RentMyKitty.Views.PetRentalRequestsNew({ model: request });
    that.attachSubview(".new-rental-request", requestView);
    this.model.petRentalRequests().each(this.addPetRentalRequest.bind(this));
  },
  
  addPetRentalRequest: function (request) {
    var rentalView = new RentMyKitty.Views.PetRentalRequestsNew({ model: request });
    this.attachSubview(".new-rental-request", rentalView);
  },
    
  render: function () {
    var view = this;
    var renderedContent = view.template({ pet: this.model });
    view.$el.html(renderedContent);
    this.attachSubviews();
    return view;
  }
  
});