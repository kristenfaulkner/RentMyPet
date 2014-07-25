RentMyKitty.Views.PetRentalRequestItem = Backbone.CompositeView.extend({
  template: JST["pet_rental_requests/index_item"],
  className: "rental-request-item",
  tagName: "tr",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "submit form#approve-request" : "approveRequest",
    "submit form#deny-request" : "denyRequest"
  },

  approveRequest: function(event) {
    event.preventDefault();
    this.model.save({status: "Approved"}, {     
      success: function () {
        alert("Rental Approved");
      }
    });
  },

  denyRequest: function(event) {
    event.preventDefault();
    alert("Rental Denied");
    this.model.destroy();

  },
  
  render: function () {
    var view = this;
    var renderedContent = view.template({
      model: view.model
    });
    view.$el.html(renderedContent);
    return view;
  }
});