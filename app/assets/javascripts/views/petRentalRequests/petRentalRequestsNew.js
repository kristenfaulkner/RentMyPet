RentMyKitty.Views.PetRentalRequestsNew = Backbone.CompositeView.extend({
  template: JST["pet_rental_requests/new"],

  events: {
    "click #submit-rental-request" : "submit"
  },
  
  initialize: function() {
  },
  
  render: function () {
    var renderedContent = this.template({
      rental: this.model
    });

    this.$el.html(renderedContent);
    
    this.delegateDatepicker();
    
    return this;
  },
  
  delegateDatepicker: function () {
    var unavailable = this.model.pet().unavailableDates().map(function(date) {
      return [date.getDate(), date.getMonth(), date.getFullYear()].join("-");
    });

    console.log(unavailable);
    this.$('#datepicker').datepicker({
        minDate: new Date(),
        format: "mm/dd/yy",
        beforeShowDay: function(date) {
          var d = [date.getDate(), date.getMonth(), date.getFullYear()].join("-");
          console.log(d);
          // console.log(d);
          return ($.inArray(d, unavailable) < 0);
        }
    });
  },
  
  delegateEvents: function () {
    Backbone.View.prototype.delegateEvents.call(this);
    this.delegateDatepicker();
  },

  submit: function (event) {
    event.preventDefault();
    var start_date = this.$("#start-date").val();
    var end_date = this.$("#end-date").val();
    //do not let them select dates that have unavailable dates in them
    //if (invalid_request)
    //alert that they cannot book it
    //else run the code below
    var rental = this.model;
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

   


   