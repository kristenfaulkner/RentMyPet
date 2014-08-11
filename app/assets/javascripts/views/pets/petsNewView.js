RentMyKitty.Views.PetsNewView = Backbone.CompositeView.extend({
  template: JST["pets/new"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);

    var photos = new RentMyKitty.Views.ImagesIndex({
      collection: this.model.images(),
      model: this.model
    });
    this.addSubview(".edit-images", photos);
    // this.$('img').append('<button id="delete-image" class = "btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button>');
  },

  events: {
    "submit form.edit-pet-form": "submit",
    "click button#delete-pet-button" : "deletePet",
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
               view.model.set('image_url', newImage.get('image_url'));
               view.model.save();

             }
           });
      });
    });
  },

  //
  // deleteImage: function() {
  //     <button id="delete-image" class = "btn btn-danger"><span class="glyphicon glyphicon-remove"></button>
  // },

  render: function () {
    var renderedContent = this.template({ pet: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

  deletePet: function(event) {
    event.preventDefault();
    this.model.destroy();
  },

  setLatLng: function(params, callback) {
    var pet = this.model
    var geo = new google.maps.Geocoder;

    var myAddress = params["pet"]["address"] + " " + params["pet"]['city'] + " " + params["pet"]['state'] + " " + params["pet"]['zipcode'];
      console.log(myAddress);
      geo.geocode( { 'address': myAddress}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var coords = results[0].geometry.location;
          var lat = coords.k;
          var long = coords.B;
          params["pet"]['lat'] = lat;
          params["pet"]['lng'] = long;
        }
        callback(params);
      });

  },

  submit: function (event) {
    var view = this;
    event.preventDefault();
    if (!window.current_user_id) {
      $('#myModal').modal({keyboard: true, backdrop: true});
            $('.modal-backdrop').on('click', function() { $('#signUpModal').modal("hide") })
      $('.modal-backdrop').on('click', function() { $('#myModal').modal("hide") })


    } else {
    var params = $(event.currentTarget).serializeJSON();
    params = this.setLatLng(params, function(params) {
      view.model.save((params["pet"]), {
        success: function () {
          RentMyKitty.Collections.pets.add(view.model);
          view.addImage();
          var path = "#/pets/" + view.model.get('id');
          Backbone.history.navigate(path, { trigger: true });
        }
      });
    });
  }
  }
});
