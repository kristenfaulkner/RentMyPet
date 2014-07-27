RentMyKitty.Views.GooleMapsView = Backbone.View.extend({
  template: JST["maps/google_map"],

  initialize: function() {
    // this.listenTo(this.collection, "sync sort remove", this.render);

    var mapOptions = {
      center: new google.maps.LatLng(37.7833, -122.4167),
      zoom: 11
    };
    this.map = new google.maps.Map(this.$('#myMap')[0], mapOptions);
    this.setMarkers(this.petData(), this.map);
    //make this.map.center be the location of the current user
  },

  petData: function() {
    var image1 = "http://media.eukanuba.com/en_us/data_root/_images/global/Puppy-Growth-Development-icon.png";
    return [
      ['Bondi Beach', 37.75, -122.42, 4, image1, '<div>This is my content</div>'],
      ['App Academy', 37.75, -122.45, 4, image1, '<div>This is my content</div>'],
      ['Coogee Beach', 37.7, -122.41, 5, image1, '<div>This is my content</div>'],
      ['Cronulla Beach', 37.8, -122.412, 3, image1, '<div>This is my content</div>'],
      ['Manly Beach', 37.73, -122.38, 2, image1, '<div>This is my content</div>'],
      ['Maroubra Beach', 37.9, -122.4, 1, image1, '<div>This is my content</div>']
    ];
  },

  setMarkers: function() {
    var view = this;
    var image = {
       url: 'http://www.pixeljoint.com/files/icons/full/cat__r177950541.gif',
       // This marker is 20 pixels wide by 32 pixels tall.
       size: new google.maps.Size(20, 32),
       // The origin for this image is 0,0.
       origin: new google.maps.Point(0,0),
       // The anchor for this image is the base of the flagpole at 0,32.
       anchor: new google.maps.Point(0, 32)
    };

     for (var i = 0; i < petData().length; i++) {
       var beach = petData[i];
       var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
       var marker = new google.maps.Marker({
           position: myLatLng,
           map: view.map,
           icon: beach[4],
           title: beach[0],
           zIndex: beach[3],
           draggable: false
       });

       google.maps.event.addListener(marker, 'click', function() {
         infoWindow.open(view.map, marker);
       });

       var infoWindow = new google.maps.InfoWindow({
             content: beach[5],
             maxWidth: 300
       });
     }
   }
});