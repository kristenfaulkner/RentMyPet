RentMyKitty.Views.PetRentalRequestsIndex = Backbone.CompositeView.extend({
  template: JST["pet_rental_requests/index"],
  className: "row",
  
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPetRentalRequest);
    this.listenTo(this.collection, "remove", this.removePetRentalRequest);
  },
  
  render: function () {
    var renderedContent = this.template();    
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },
  
  addPetRentalRequest: function (petRental) {
    var rentalItem = new RentMyKitty.Views.PetRentalRequestItem({ model: petRental });
    this.addSubview(".rental-request-list", rentalItem);
  },

  removePetRentalRequest: function (request) {
      var subview = _.find(
        this.subviews(".rental-request-list"),
        function (subview) {
          return subview.model === request;
        }
      );
      this.removeSubview(".rental-request-list", subview);
    },


  render: function () {
    var view = this;
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});