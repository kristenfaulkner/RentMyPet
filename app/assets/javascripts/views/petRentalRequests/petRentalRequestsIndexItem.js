RentMyKitty.Views.petRentalRequestsIndexItem = Backbone.CompositeView.extend({
  template: JST["pet_rental_requests/index_item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click button#approve-request-button": "approveRequest"
    "click button#deny-request-button": "denyRequest"
  },

  denyRequest: function(event) {
    event.preventDefault();
    this.model.destroy();
    alert("The request has been denied");
    //send message to requester
  },
  
  approveRequest: function(event) {
    event.preventDefault();
    var requestView = this;
    this.model.set('status', "Approved");
    requestView.model.save({ wait: true }, { 
      success: function () {
        // requestView.collection.add(requestView.model);
        alert("You have just approved the request!");
        //send message to requester
      }
    });
  }
  
  render: function () {
    var view = this;
    var renderedContent = this.template({
     model: this.model
    });

    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});



