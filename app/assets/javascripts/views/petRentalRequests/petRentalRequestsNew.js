RentMyKitty.Views.PetRentalRequestsNew = Backbone.CompositeView.extend({
  template: JST["pet_rental_requests/new"],

  events: {
    "click #submit-rental-request" : "submit"
  },
  
  initialize: function() {
    Window.unavailableDates = this.model.pet().unavailableDates();
  },
  
  render: function () {
    var renderedContent = this.template();    
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (event) {
    var view = this;
    event.preventDefault();
    var start_date = this.$("#start-date").val();
    var end_date = this.$("#end-date").val();
    console.log(start_date);
    console.log(end_date);
    var rental = this.model;
    var start_date = this.$("#start-date").val();
    var end_date = this.$("#end-date").val();
    rental.set({start_date: new Date(start_date), end_date: new Date(end_date)});
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

   
   