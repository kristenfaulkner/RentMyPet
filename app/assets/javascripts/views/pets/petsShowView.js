RentMyKitty.Views.PetsShowView = Backbone.CompositeView.extend({
  
  template: JST['pets/show'],
  
  events: {
    // "click" : "showMessage"
  },
  
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    
    var newRental = new RentMyKitty.Models.PetRentalRequest({ pet_id: this.model.get('id') });
    var newRentalView = new RentMyKitty.Views.PetRentalRequestsNew({ model: newRental });
    this.addSubview(".new-rental-request", newRentalView);
    
  
    var approvedRentals = new RentMyKitty.Views.PetRentalRequestsIndex({
      collection: this.model.petRentalRequests()
    });
    this.addSubview(".rental-request-list", approvedRentals);
  },
  
  // validDates: function(start_date, end_date) {
  //
  //   var unavailable = this.model.unavailableDates();
  //   var unavailable_times = unavailable.map(function(date) {
  //     return date.getTime();
  //   });
  //   var start = new Date(start_date).getTime();
  //   var end = new Date(end_date).getTime();
  //   var tmp = true;
  //   unavailable_times.forEach(function(date) {
  //     if (date >= start && date <= end) {
  //       tmp = false;
  //     }
  //   })
  //   return tmp;
  // },
  //
  // showMessage: function() {
  //   var start = this.$("#start-date").val();
  //   var end = this.$("#end-date").val();
  //   if ((start == "") || (end == "")) {
  //     this.$('.message').html("");
  //   } else if (this.validDates(start, end)) {
  //       this.$('.message').html(
  //         "<div class='valid-request'><span class='glyphicon glyphicon-ok'></span> These dates are available</div>"
  //       );
  //   } else {
  //     this.$('.message').html(
  //       "<div class='invalid-request'>Sorry, those dates are unavailable. Please try again.</div>"
  //     );
  //   }
  // },
  
  render: function () {
    var view = this;
    var renderedContent = view.template({ pet: this.model });
    view.$el.html(renderedContent);
    view.attachSubviews();
    return view;
  }
  
});






























// this.listenTo(this.model.petRentalRequests(), "sync", this.render);
// this.listenTo(this.model.petRentalRequests(), "add", this.render);
// this.listenTo(this.model.petRentalRequests(), "remove", this.render);

// var indexView = new RentMyKitty.Views.PetRentalRequestsIndex();
// this.attachSubview(".new-rental-request", indexView);


// removePetRentalRequest: function (request) {
//     var subview = _.find(
//       this.subviews(".new-rental-request"),
//       function (request) {
//         return subview.model === request;
//       }
//     );
//
//     this.removeSubview(".new-rental-request", subview);
// },