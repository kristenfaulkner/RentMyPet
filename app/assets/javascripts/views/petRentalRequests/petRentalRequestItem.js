RentMyKitty.Views.PetRentalRequestItem = Backbone.CompositeView.extend({
  template: JST["pet_rental_requests/index_item"],
  className: "rental-request-item",
  tagName: "tr",

  initialize: function (options) {
    this.pet = options.pet
    this.listenTo(this.model, "sync remove", this.render);
  },

  events: {
    "click #approve-request-button" : "approveRequest",
    "submit form#deny-request" : "denyRequest"
  },

  approveRequest: function(event) {
    var view = this;
    event.preventDefault();
    this.model.set({ status: "Approved" });
    this.model.save({}, {
      success: function () {
        alert("Rental Approved");
        view.pet.fetch();
        // view.collection.reset({data: {pet_id: view.model.pet_id}});
      }
    });
  },

  denyRequest: function(event) {
    event.preventDefault();
    this.model.destroy();
    alert("Rental Denied");
  },

  fixTimezone: function() {
    var s = this.model.get('start-date');
    var e = this.model.get('end-date');
  },

  render: function () {
    this.fixTimezone();
    var view = this;
    var renderedContent = view.template({
      model: view.model
    });
    view.$el.html(renderedContent);
    return view;
  }
});
