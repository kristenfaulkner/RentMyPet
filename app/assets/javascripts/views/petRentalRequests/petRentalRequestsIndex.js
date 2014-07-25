RentMyKitty.Views.PetRentalRequestsIndex = Backbone.CompositeView.extend({
  template: JST["pet_rental_requests/index"],
  className: "row",
  
  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.render);   
    this.listenTo(this.collection, "sort", this.resetPetRentalRequests);
    this.listenTo(this.collection, "remove", this.removePetRentalRequest);
    this.collection.each(this.addPetRentalRequest.bind(this));

  },
  
  resetPetRentalRequests: function() {
    var that = this;
    this.subviews('.rental-request-list').forEach(function(subview) {
      subview.remove();
    });
    this.collection.each(function(rental) { that.addPetRentalRequest(rental) });
  },
  
  addPetRentalRequest: function (request) {
    var rentalItem = new RentMyKitty.Views.PetRentalRequestItem({ model: request});
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