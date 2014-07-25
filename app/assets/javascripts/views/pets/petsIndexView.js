RentMyKitty.Views.PetsIndexView = Backbone.CompositeView.extend({
  template: JST["pets/index"],

  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, 'sort', this.resetPets);
    this.listenTo(this.collection, "remove", this.removePet);
    
    this.resetPets();
  },
  
  events: {
    "click .wrapper" : "goToPetProfile"
  },
  
  goToPetProfile: function(event) {
    event.preventDefault();
    var id = $(event.currentTarget).data('petId')
    var path = "#/pets/" + id;
    Backbone.history.navigate(path, { trigger: true });
  },
  
  addPet: function (pet) {
    var petsIndexItem = new RentMyKitty.Views.PetsIndexItem({ model: pet });
    this.addSubview("#pets", petsIndexItem);
  },
  
  resetPets: function() {
    var that = this;
    this.subviews('#pets').forEach(function(subview) {
      subview.remove();
    });
    this.collection.each(function(pet) { that.addPet(pet) });
  },

  removePet: function (pet) {
    var subview = _.find(
      this.subviews("#pets"),
      function (subview) {
        return subview.model === pet;
      }
    );
    this.removeSubview("#pets", subview);
  },


  render: function () {
    var renderedContent = this.template({ pets: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});