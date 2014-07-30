RentMyKitty.Views.PetsIndexView = Backbone.CompositeView.extend({
  template: JST["pets/index"],

  initialize: function(options) {

    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, 'sort', this.resetPets);
    this.listenTo(this.collection, "remove", this.removePet);
    this.resetPets();
    mapView = new RentMyKitty.Views.GooleMapsView({ collection: this.collection });
    this.addSubview('.map', mapView);
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

  delegateDatepicker: function() {
    this.$('#index-datepicker').datepicker({
        minDate: new Date(),
        startDate: "today",
        format: "mm/dd/yy"
    });
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
    this.delegateDatepicker(); 
    this.attachSubviews();
    return this;
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

