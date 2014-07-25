RentMyKitty.Views.PetsIndexView = Backbone.CompositeView.extend({
  template: JST["pets/index"],

  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPet);
    this.listenTo(this.collection, "remove", this.removePet);
  },
  //
  // events: {
  //   "click button.upload-new-pet" : "newPetPage"
  // },
  //
  // newPetPage: {
  //   var newPet = new RentMyKitty.Models.Pet();
  //   var petsNewView = new RentMyKitty.Views.PetsNewView({ model: newPet });
  //   this.$el(petsNewView.render().$el);
  // },
  //
  addPet: function (pet) {
      var petsIndexItem = new RentMyKitty.Views.PetsIndexItem({ model: pet });
      this.addSubview(".rental-request-list", petsIndexItem);
    },

  removePet: function (petRental) {
      var subview = _.find(
        this.subviews(".rental-request-list"),
        function (subview) {
          return subview.model === petRental;
        }
      );
      this.removeSubview(".rental-request-list", subview);
    },


  render: function () {
    var view = this;
    var renderedContent = this.template({ pets: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});