RentMyKitty.Views.PetsNewView = Backbone.View.extend({
  template: JST["pets/form"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },
  
  events: {
    "submit form": "submit",
    "click button#delete-pet-button" : "deletePet"
  },

  render: function () {
    var renderedContent = this.template({ pet: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  deletePet: function(event) {
    event.preventDefault();
    this.model.destroy();
  },
  
  submit: function (event) {
    var view = this;
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    view.model.save((params["pet"]), {
      success: function () {
        RentMyKitty.Collections.pets.add(view.model);
        var path = "#/pets/" + view.model.get('id');
        Backbone.history.navigate(path, { trigger: true });
      }
    });
  }
});


// set pet owner id to current user will happen on the rail's side?