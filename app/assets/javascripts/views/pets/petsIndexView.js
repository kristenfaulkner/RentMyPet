RentMyKitty.Views.PetsIndexView = Backbone.CompositeView.extend({
  template: JST["pets/index"],

  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPet);
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
      this.addSubview("#pets", petsIndexItem);
    },

  // removePet: function (pet) {
 //      var subview = _.find(
 //        this.subviews(".pets"),
 //        function (subview) {
 //          return subview.model === pet;
 //        }
 //      );
 //      this.removeSubview(".pets", subview);
 //    },


  render: function () {
    var view = this;
    var renderedContent = this.template({ pets: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});