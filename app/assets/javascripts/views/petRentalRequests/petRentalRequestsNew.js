RentMyKitty.Views.PetRentalRequestsNew = Backbone.CompositeView.extend({
  template: JST["pet_rental_requests/new"],

  events: {
    "submit form#new-rental-request": "submit",
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
        newRentalView.model.collection().add(newRentalView.model);
        alert("Your rental request has been submitted");
      }
    });
  }
});

   
   