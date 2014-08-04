RentMyKitty.Views.PetRentalRequestsIndex = Backbone.CompositeView.extend({
  template: JST["pet_rental_requests/index"],
  className: "row",

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "sort", this.resetPetRentalRequests);
    this.listenTo(this.collection, "remove", this.removePetRentalRequest);
    this.listenTo(this.collection, "reset", this.resetSubviews)
    this.collection.each(this.addPetRentalRequest.bind(this));
  },

  resetSubviews: function() {
    this.removeSubviews();
    this.collection.each(this.addPetRentalRequest.bind(this));
    // var view = this;
//     debugger
//     _(view.subviews('.rental-request-list')).each(function(request) {
//       if ($.inArray(view.collection, request.model) < 0) {
//         view.removeSubview(".rental-request-list", request);
//       }
//     })
    this.render();
  },

  resetPetRentalRequests: function() {
    var that = this;
    this.subviews('.rental-list-items').forEach(function(subview) {
      subview.remove();
    });
    this.collection.each(function(rental) { that.addPetRentalRequest(rental) });
  },

  addPetRentalRequest: function (request) {
    var rentalItem = new RentMyKitty.Views.PetRentalRequestItem({ model: request, collection: this.collection, pet: this.model});
    this.addSubview(".rental-list-items", rentalItem);
  },

  removePetRentalRequest: function (request) {
    var subview = _.find(
      this.subviews(".rental-list-items"),
      function (subview) {
        return subview.model === request;
      }
    );
    this.removeSubview(".rental-list-items", subview);
  },


  render: function () {
    var view = this;
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});
