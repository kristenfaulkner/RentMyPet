RentMyKitty.Views.GooleMapsView = Backbone.View.extend({
  template: JST["maps/google_map"],
  
  events: {
    "click #codeAddress" : "codeAddress"
  },

  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render)
  },
  
  render: function() {
    var mapOptions = {
      center: new google.maps.LatLng(37.7833, -122.4167),
      zoom: 12
    };   
  
    
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    RentMyKitty.map = new google.maps.Map(this.$('#myMap')[0], mapOptions);
    
    RentMyKitty.infowindow = new google.maps.InfoWindow({
      map: RentMyKitty.map
    });
    
    this.getLocation();
    this.petData();
    return this;
  },
  
  getLocation: function() {
    var view = this;
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
                                           position.coords.longitude);

          RentMyKitty.infowindow = new google.maps.InfoWindow({
            map: RentMyKitty.map,
            position: pos
          });
          RentMyKitty.map.setCenter(pos);
        }, function() {
          view.handleNoGeolocation(true);
      });
    } else {
      // If browser doesn't support Geolocation
      view.handleNoGeolocation(false);
    }
  },
      
  handleNoGeolocation: function(errorFlag) {
    var content;
    if (errorFlag) {
      content = 'Error: The Geolocation service failed.';
    } else {
      content = 'Error: Your browser doesn\'t support geolocation.';
    };

    var options = {
      map: RentMyKitty.map,
      position: new google.maps.LatLng(window.current_location[0], window.current_location[1]),
      content: content
    };
  },

  
  petData: function() {
    var view = this;
    var geo = new google.maps.Geocoder;
    this.collection.each(function(pet) {
      var address = pet.get('address') + " " + pet.get('city') + " " + pet.get('state') + " " + pet.get('zipcode');
      geo.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var coords = results[0].geometry.location;
          var lat = coords.k;
          var long = coords.B;
          var content = JST["maps/infowindow"];
          var petData = [pet.get('name'), lat, long, 4, content({ pet: pet})];
          view.setMarker(petData);
        }
      });
    });
  },
  
  setMarker: function(petData) {
    
    //set target image on map
    var image = {
       url: 'http://www.pixeljoint.com/files/icons/full/cat__r177950541.gif',
       // This marker is 20 pixels wide by 32 pixels tall.
       size: new google.maps.Size(20, 32),
       // The origin for this image is 0,0.
       origin: new google.maps.Point(0,0),
       // The anchor for this image is the base of the flagpole at 0,32.
       anchor: new google.maps.Point(0, 32)
    };
   
    var myLatLng = new google.maps.LatLng(petData[1], petData[2]);
    var marker = new google.maps.Marker({
       position: myLatLng,
       map: RentMyKitty.map,
       icon: image,
       title: petData[0],
       zIndex: petData[3],
       draggable: false,   
    });

    google.maps.event.addListener(marker, 'click', function() {
      RentMyKitty.infowindow.close();
      RentMyKitty.infowindow.setContent(petData[4]);
      RentMyKitty.infowindow.open(RentMyKitty.map, marker);
    });
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
        RentMyKitty.map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: RentMyKitty.map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  
});
