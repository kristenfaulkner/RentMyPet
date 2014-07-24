window.RentMyKitty = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    RentMyKitty.Collections.pets = new RentMyKitty.Collections.Pets();
    
    new RentMyKitty.Routers.RentMyKittyRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  RentMyKitty.initialize();
});