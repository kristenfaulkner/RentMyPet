RentMyKitty.Views.PetsEditView = Backbone.CompositeView.extend({
  template: JST["pets/form"],

  events: {
    //listen to see if the dates are unavailable
     "submit form.edit-form": "submit",
     "click button.delete-pet" : "delete-pet"
  },
  
  initialize: function (options) {    
  },
  
  render: function () {
    var view = this;
    var renderedContent = view.template({ model: view.model });
    view.$el.html(renderedContent);
    view.attachSubviews();
    return view;
  },
  
  deletePet: function(event) {
    confirm("Are you sure you would like to delete this pet? All the pet's data will be deleted. This action cannot be undone.")
    event.preventDefault();
    this.model.destroy();
  },
  
  submit: function (event) {
    event.preventDefault();
    var cardView = this;
    var params = $(event.currentTarget).serializeJSON();
    petView.model.set(params["pet"]);
    petView.model.save({ wait: true }, {
      success: function () {
        petView.collection.add(petView.model);
        //why do I add this to the collection? Doesn't the collection listen for a sync?
        //render back to the pet profile page
        alert("Your pet has been updated successfully")
      }
    });
  }
  
});
