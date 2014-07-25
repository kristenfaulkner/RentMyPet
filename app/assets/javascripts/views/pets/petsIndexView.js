RentMyKitty.Views.PetsIndexView = Backbone.CompositeView.extend({
  template: JST["pets/index"],

  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPet);
    this.listenTo(this.collection, "remove", this.removePet);
  },

  addPet: function (pet) {
      var petsIndexItem = new RentMyKitty.Views.PetsIndexItem({ model: pet });
      this.addSubview("#pets", petsIndexItem);
    },

  removePet: function (petRental) {
      var subview = _.find(
        this.subviews("#pets"),
        function (subview) {
          return subview.model === petRental;
        }
      );
      this.removeSubview("#pets", subview);
    },


  render: function () {
    var view = this;
    var renderedContent = this.template({ pets: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});