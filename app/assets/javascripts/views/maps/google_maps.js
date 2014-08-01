RentMyKitty.Views.GooleMapsView = Backbone.View.extend({
  template: JST["maps/google_map"],
  
  events: {
    "click #codeAddress" : "codeAddress"
  },

  initialize: function(options) {
    this.markers = [];
    this.listenTo(this.collection, "sync", this.render);
  },
  
  render: function() {
    var mapOptions = {
      center: new google.maps.LatLng(37.7250, -122.4450),
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
      position: new google.maps.LatLng(37.7250, -122.4450),
      content: content
    };
  },

  clearMarkers: function() {
    this.markers.forEach(function(marker) {
      marker.setMap(null);
    });
    this.markers = [];
  },

  renderMarkers: function(collection) {
    this.clearMarkers();
    var content = JST["maps/infowindow"];
    var view = this;
    collection.forEach(function(pet) {
      var data = [pet.get('name'), pet.get('lat'), pet.get('lng'), 4, content({ pet: pet})];
      view.setMarker(data);
    })
  },

  petData: function() {
    var content = JST["maps/infowindow"];
    var view = this;
    this.collection.each(function(pet) {
      var petData = [pet.get('name'), pet.get('lat'), pet.get('lng'), 4, content({ pet: pet})];
      view.setMarker(petData);
    });
  },
  
  setMarker: function(data) {
    console.log("setting marker");
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
   
    var myLatLng = new google.maps.LatLng(data[1], data[2]);
    var marker = new google.maps.Marker({
       position: myLatLng,
       map: RentMyKitty.map,
       icon: image,
       title: data[0],
       zIndex: data[3],
       draggable: false,   
    });

    marker.setMap(RentMyKitty.map);
    
    google.maps.event.addListener(marker, 'click', function() {
      RentMyKitty.infowindow.close();
      RentMyKitty.infowindow.setContent(data[4]);
      RentMyKitty.infowindow.open(RentMyKitty.map, marker);
    });
    this.markers.push(marker);

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

  codeAddress: function(myAddress) {
    var geo = new google.maps.Geocoder;
    // var address = this.$('#address').val();

    geo.geocode( { 'address': myAddress}, function(results, status) {
      console.log(results);
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
