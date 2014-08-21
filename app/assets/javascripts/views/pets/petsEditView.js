RentMyKitty.Views.PetsEditView = Backbone.CompositeView.extend({
  template: JST["pets/edit"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    // var photos = new RentMyKitty.Views.ImagesIndex({
    //   collection: this.model.images(),
    //   model: this.model
    // });
    // this.addSubview(".edit-images", photos);
<<<<<<< HEAD
    // var view = this
=======
>>>>>>> c8a760a02e83db7408a44c1bbfbb629ef9e1fd45
  },

  events: {
    "submit form.edit-pet-form": "submit",
    "click button#delete-pet" : "deletePet",
    "click button#add-image": "addImage"
    // ,
    // "click delete-image" : "deleteImage"
  },

  addImage: function(){
    var view = this;
    var that = this;

    filepicker.pickMultiple(function(InkBlobs){
      InkBlobs.forEach(function(blob) {

           var newImage = new RentMyKitty.Models.Image({
             pet_id: view.model.id,
             image_url: blob.url
           });

           newImage.save({}, {
             success: function () {
               view.model.images().add(newImage);
             }
           });
      });
    });
  },

  // deleteImage: function(event) {
  //   event.preventDefault();
  //   alert("wow!");
  //   debugger
  //   $(event.currentTarget).append($('<button id="delete-image" class = "btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button>'));
  // },

  render: function () {
    var renderedContent = this.template({ pet: this.model});
    this.$el.html(renderedContent);
    this.attachSubviews();
    // this.$('.delete-image').removeClass('hidden');
    return this;
  },

  deletePet: function(event) {
    event.preventDefault();
    if (confirm("Are you sure you would like to delete your pet? This action cannot be undone")) {
      this.model.destroy();
      alert("Pet deleted ");
    }
    Backbone.history.navigate("#", { trigger: true });
  },

  submit: function (event) {
    var view = this;
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    view.model.save((params["pet"]), {
      success: function () {
        RentMyKitty.Collections.pets.add(view.model);
        view.addImage();
        var path = "#/pets/" + view.model.get('id');
        Backbone.history.navigate(path, { trigger: true });
      }
    });
  }
});
