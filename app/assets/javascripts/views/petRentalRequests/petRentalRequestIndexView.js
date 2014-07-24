RentMyKitty.Views.PetRentalRequestsIndexView = Backbone.CompositeView.extend({
  template: JST["pet_rental_requests/index"],
  
  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection,"add", this.addPetRentalRequest);
    this.listenTo(this.collection,"remove", this.removePetRentalRequest);
  },
  
  addPetRentalRequest: function (petRentalRequest) {
      var petRentalRequestsIndexItem =
        new RentMyKitty.Views.PetRentalRequestsIndexItem({ model: petRentalRequest });
      this.addSubview(".petRentalRequests", petRentalRequestsShowOne);
    },
 
  removePetRentalRequest: function (petRentalRequest) {
      var subview = _.find(
        this.subviews(".petRentalRequests"),
        function (subview) {
          return subview.model === petRentalRequest;
        }
      );
      this.removeSubview(".petRentalRequests", subview);
    },
 
 
  render: function () {
    var view = this;
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});