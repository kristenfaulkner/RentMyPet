RentMyKitty.Views.PetsShowView = Backbone.CompositeView.extend({
  
  template: JST['pets/show'],
  
  initialize: function() {
    var that = this;
    this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.model.petRentalRequests(), "sync", this.render);
    // this.listenTo(this.model.petRentalRequests(), "add", addPetRentalRequest);
    // this.listenTo(this.model.petRentalRequests(), "remove", this.removePetRentalRequest);
    // var request = new RentMyKitty.Models.PetRentalRequest({pet: this.model});
 //    var requestView = new RentMyKitty.Views.PetRentalRequestsNew({ model: request });
 //    that.attachSubview(".new-rental-request", requestView);
       var indexView = new RentMyKitty.Views.PetRentalRequestsIndex();
       that.attachSubview(".new-rental-request", indexView);
    // this.model.petRentalRequests().each(this.addPetRentalRequest.bind(this));
  },
  //
  // addPetRentalRequest: function (request) {
  //   var rentalView = new RentMyKitty.Views.PetRentalRequestsNew({ model: request });
  //   this.attachSubview(".new-rental-request", rentalView);
  // },
  //
  // removePetRentalRequest: function (request) {
  //     var subview = _.find(
  //       this.subviews(".new-rental-request"),
  //       function (request) {
  //         return subview.model === request;
  //       }
  //     );
  //
  //     this.removeSubview(".new-rental-request", subview);
  // },
    
  render: function () {
    var view = this;
    var renderedContent = view.template({ pet: this.model });
    view.$el.html(renderedContent);
    view.attachSubviews();
    return view;
  }
  
});