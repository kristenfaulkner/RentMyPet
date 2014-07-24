RentMyKitty.Views.PetRentalRequestsNewView = Backbone.CompositeView.extend({
  template: JST["petRentalRequests/new"],

  events: {
    "submit form#new-rental-request": "submit",
  },
  
  initialize: function(options) {
  },
  
  render: function () {
    var renderedContent = this.template();    
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var newRentalView = this;
    var params = $(event.currentTarget).serializeJSON();
    newRentalView.model.set(params["petRentalRequest"]);
    newRentalView.model.save({ wait: true}, {
      success: function () {
        newRentalView.collection().add(newRentalView.model);
      }
    });
  }
});