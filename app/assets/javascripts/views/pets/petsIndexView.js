RentMyKitty.Views.PetsIndexView = Backbone.CompositeView.extend({
  template: JST["pets/index"],

  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, 'sort', this.resetPets);
    this.listenTo(this.collection, "remove", this.removePet);
    
    this.resetPets();
  },
  
  events: {
    "click .wrapper" : "goToPetProfile"
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
    var image1 = "http://media.eukanuba.com/en_us/data_root/_images/global/Puppy-Growth-Development-icon.png";
    var image2 = 'http://fc09.deviantart.net/fs71/f/2011/306/2/6/kawaii_pixel_cat_icon_by_boogle_chan-d4evsi1.gif';
    var renderedContent = this.template({ pets: this.collection, view: this });
    this.$el.html(renderedContent);
    this.initializeMap();
    this.attachSubviews();
    return this;
  },
  
  initializeMap: function(){
    var view = this;
    var mapOptions = {
      center: new google.maps.LatLng(37.7833, -122.4167),
      zoom: 11
    };
    Window.map = new google.maps.Map(view.$('#myMap')[0], mapOptions);
    view.setMarkers(view.petData(), Window.map);
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
  
  setMarkers: function(petData, map) {
    
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
       var beach = petData[i];
       var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
       var marker = new google.maps.Marker({
           position: myLatLng,
           map: Window.map,
           icon: beach[4],
           title: beach[0],
           zIndex: beach[3],
           draggable: false,   
       });
       
       google.maps.event.addListener(marker, 'click', function() {
         infoWindow.open(Window.map, marker);
       });

       var infoWindow = new google.maps.InfoWindow({
             content: beach[5],
             maxWidth: 300
       });
     }
  }// ,
//
//   codeAddress: function() {
//     var address = this.$('address').val();
//     geocoder.geocode( { 'address': address}, function(results, status) {
//       if (status == google.maps.GeocoderStatus.OK) {
//         Window.map.setCenter(results[0].geometry.location);
//         var marker = new google.maps.Marker({
//             map: Window.map,
//             position: results[0].geometry.location
//         });
//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
//   }
  

});