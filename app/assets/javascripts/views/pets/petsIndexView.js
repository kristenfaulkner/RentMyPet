RentMyKitty.Views.PetsIndexView = Backbone.CompositeView.extend({
  template: JST["pets/index"],

  initialize: function(options) {
    window.view = this;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, 'sort', this.resetPets);
    this.listenTo(this.collection, "remove", this.removePet);
    this.resetPets();
  },
  
  events: {
    "click .wrapper" : "goToPetProfile",
    "click #codeAddress" : "codeAddress"
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
    var renderedContent = this.template({ pets: this.collection, view: this });
    this.$el.html(renderedContent);
    this.initializeMap();
    this.attachSubviews();
    return this;
  },
  
  initializeMap: function(){
    var mapOptions = {
      center: new google.maps.LatLng(37.7833, -122.4167),
      zoom: 11
    };
    Window.map = new google.maps.Map(view.$('#myMap')[0], mapOptions);
    this.getLocation();
    this.setMarkers();    
  },

  getLocation: function() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
                                           position.coords.longitude);

          var infowindow = new google.maps.InfoWindow({
            map: Window.map,
            position: pos,
            content: 'Location found using HTML5.'
          });

          Window.map.setCenter(pos);
        }, function() {
          handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      view.handleNoGeolocation(false);
    }
  },
      
  handleNoGeolocation: function(errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    };

    var options = {
      map: Window.map,
      position: new google.maps.LatLng(window.current_location[0], window.current_location[1]),
      content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    Window.map.setCenter(options.position);
  },

  
  petData: function() {
    var view = this;
    // var data = [];
    var geo = new google.maps.Geocoder;
    
    // this.collection.each(function(pet) {
//       var address = pet.get('address') + " " + pet.get('city') + " " + pet.get('state') + " " + pet.get('zipcode');
//       geo.geocode( { 'address': address}, function(results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//           var coords = results[0].geometry.location;
//           var lat = coords.k;
//           var long = coords.B;
//           var content = JST["pets/map_popup"];
//           data.push([pet.get('name'), lat, long, 4, content({ pet: pet})]);
//         }
//       });
//     });
    var data = [
          ['Bondi Beach', 37.75, -122.42, 4, "<div>Hello World!</div>"],
          ['App Academy', 37.75, -122.45, 4,"<div>Hello World!</div>"],
          ['Coogee Beach', 37.7, -122.41, 5,"<div>Hello World!</div>"],
          ['Cronulla Beach', 37.8, -122.412, 3,"<div>Hello World!</div>"],
          ['Manly Beach', 37.73, -122.38, 2,"<div>Hello World!</div>"],
          ['Maroubra Beach', 37.9, -122.4, 1, "<div>Hello World!</div>"]
        ];
        return data;
  },
  
  setMarkers: function() {
    var petData = this.petData();
    var image = {
       url: 'http://www.pixeljoint.com/files/icons/full/cat__r177950541.gif',
       // This marker is 20 pixels wide by 32 pixels tall.
       size: new google.maps.Size(20, 32),
       // The origin for this image is 0,0.
       origin: new google.maps.Point(0,0),
       // The anchor for this image is the base of the flagpole at 0,32.
       anchor: new google.maps.Point(0, 32)
    };
     
     for (var i = 0; i < petData.length; i++) {
       var pet = petData[i];
       var myLatLng = new google.maps.LatLng(pet[1], pet[2]);
       var marker = new google.maps.Marker({
           position: myLatLng,
           map: Window.map,
           icon: "http://media.eukanuba.com/en_us/data_root/_images/global/Puppy-Growth-Development-icon.png",
           title: pet[0],
           zIndex: pet[3],
           draggable: false,   
       });
       
       var infoWindow = new google.maps.InfoWindow({
             content: pet[4],
             maxWidth: 300
       });
       
       google.maps.event.addListener(marker, 'click', function() {
         infoWindow.open(Window.map, marker);
       });

     }
  },

  getCoords: function(address) {
    var geo = new google.maps.Geocoder;
    geo.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var coords = results[0].geometry.location;
        console.log(coords.k, coords.B);
        return coords;
      } else {
        return false;
      }
    });
  },
  
  codeAddress: function() {
    var geo = new google.maps.Geocoder;
    var address = this.$('#address').val();
    geo.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        Window.map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: Window.map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


});