RentMyKitty.Views.GooleMapsView = Backbone.View.extend({
  template: JST["maps/google_map"],

  events: {
    "click #codeAddress" : "codeAddress"
  },
  
  initializeMap: function(){
    var mapOptions = {
      center: new google.maps.LatLng(37.7833, -122.4167),
      zoom: 11
    };   
    RentMyKitty.infoWindow = new google.maps.InfoWindow({
         maxWidth: 300
    });    
    RentMyKitty.map = new google.maps.Map(view.$('#myMap')[0], mapOptions);
    this.getLocation();
    this.petData();
  },

  getLocation: function() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
                                           position.coords.longitude);

          var infowindow = new google.maps.InfoWindow({
            map: RentMyKitty.map,
            position: pos,
            content: 'Location found using HTML5.'
          });

          RentMyKitty.map.setCenter(pos);
        }, function() {
          handleNoGeolocation(true);
      });
    } else {
      // If browser doesn't support Geolocation
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
      map: RentMyKitty.map,
      position: new google.maps.LatLng(window.current_location[0], window.current_location[1]),
      content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    RentMyKitty.map.setCenter(options.position);
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
          var content = JST["pets/map_popup"];
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
      RentMyKitty.infoWindow.close();
      RentMyKitty.infoWindow.setContent(petData[4]);
      RentMyKitty.infoWindow.open(RentMyKitty.map, marker);
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