window.RentMyKitty = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new RentMyKitty.Routers.RentMyKittyRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  RentMyKitty.initialize();
});