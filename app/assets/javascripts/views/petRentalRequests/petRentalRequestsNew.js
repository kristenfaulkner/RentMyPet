RentMyKitty.Views.PetRentalRequestsNew = Backbone.CompositeView.extend({
  template: JST["pet_rental_requests/new"],

  events: {
    "submit #new-rental-request": "submit",
  },
  
  initialize: function() {
  },
  
  render: function () {
    var renderedContent = this.template();    
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (event) {
    var view = this;
    event.preventDefault();
    var rental = this.model;
    var params = $(event.currentTarget).serializeJSON();
    console.log(params);
    rental.set(params["pet_rental_request"]);
    rental.save({}, {
      success: function () {
        rental.pet().petRentalRequests().add(rental);
        alert("Your request has been submitted!");
        this.$("#start-date").val("");
        this.$("#end-date").val("");
      }
    });
  }
});

   
   