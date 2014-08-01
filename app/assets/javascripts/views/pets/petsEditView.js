RentMyKitty.Views.PetsEditView = Backbone.CompositeView.extend({
  template: JST["pets/edit"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    debugger
    var photos = new RentMyKitty.Views.ImagesIndex({
      collection: this.model.images(),
      model: this.model
    });
    this.addSubview(".edit-images", photos);
    var view = this
    // this.$('img').append('<button id="delete-image" class = "btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button>');
  },
  
  events: {
    "submit form.edit-pet-form": "submit",
    "click button#delete-pet" : "deletePet",
    "click button#add-image": "addImage",
    "click delete-image" : "deleteImage"
  },
  
  addImage: function(){
    var view = this;
    // event.preventDefault();
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
  
  
  render: function () {
    var renderedContent = this.template({ pet: this.model});
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

  deletePet: function(event) {
    event.preventDefault();
    alert("clicked me!");
    this.model.destroy();
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

