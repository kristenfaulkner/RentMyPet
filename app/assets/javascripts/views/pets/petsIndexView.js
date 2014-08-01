RentMyKitty.Views.PetsIndexView = Backbone.CompositeView.extend({
  template: JST["pets/index"],

  initialize: function(options) {

    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, 'sort', this.resetPets);
    this.listenTo(this.collection, "remove", this.removePet);
    this.resetPets();
    this.filtered = new RentMyKitty.Collections.Pets(this.filteredSubviews());
    this.mapView = new RentMyKitty.Views.GooleMapsView({ collection: this.collection});
    this.addSubview('.map', this.mapView);
  },
  
  events: {
    "click .wrapper" : "goToPetProfile",
    "click #codeAddress" : "codeAddress",
    "click #start-date" : "repositionCatsDown",
    "click #end-date" : "repositionCatsDown",
    "click #end-date" : "repositionCatsDown",
    "mouseover #pets" : "repositionCatsUp",
    "change .filter-date" : "filter",
    "change .filter-color" : "filter",
    "change .filter-gender" : "filter"
  },
  
  filteredSubviews: function() {
    var view = this
    var filter = [];
    this.subviews('#pets').forEach(function(subview) {  filter.push(subview.model)})
    return filter;
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
    this._subviews["#pets"] = [];
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
    this.mapView.codeAddress(myAddress);
    var myAddress = this.$('#address').val();
    // var geo = new google.maps.Geocoder;
//     console.log(geo);
//     var myAddress = this.$('#address').val();
//     geo.geocode( { 'address': myAddress}, function(results, status) {
//       if (status == google.maps.GeocoderStatus.OK) {
//         RentMyKitty.map.setCenter(results[0].geometry.location);
//         // var marker = new google.maps.Marker({
//  //            map: RentMyKitty.map,
//  //            position: results[0].geometry.location
//  //        });
//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
  },

  repositionCatsDown: function() {
    this.$('#pets').css("margin-top", "115px");
  },
  
  repositionCatsUp: function() {
    this.$('#pets').css("margin-top", "0");
  },

  // validDates: function(pet, start_date, end_date) {
//     var unavailable = pet.unavailableDates();
//     var unavailable_times = unavailable.map(function(date) {
//       return (new Date(date)).getTime();
//     });
//     var start = (new Date(start_date)).getTime();
//     var end = (new Date(end_date)).getTime();
//     var tmp = true;
//     unavailable_times.forEach(function(date) {
//       if (date >= start && date <= end) {
//         tmp = false;
//       }
//     })
//     return tmp;
//   },
//
 
filter: function() {
  this.resetPets();
  var view = this;

  var start = this.$("#start-date").val();
  var end = this.$("#end-date").val();

  var genders = [];
  var checkedGenders = this.$(".filter-gender").filter(":checked").toArray();
  checkedGenders.forEach(function(box) { genders.push(box.value)});

  var colors = [];
  var checkedColors = this.$(".filter-color").filter(":checked").toArray();
  checkedColors.forEach(function(box) { colors.push(box.value)});

  this.collection.each(function(pet) {
    if ((checkedColors.length > 0) && ($.inArray(pet.get('color'), colors) < 0)) {
      view.removePet(pet)
    } else if ((checkedGenders.length > 0) && ($.inArray(pet.get('gender'), genders) < 0)) {
        view.removePet(pet)
    } else if (((start != "") && (end != "")) && (!pet.validDates(start, end))) {
          view.removePet(pet);
    }
  });
  this.mapView.renderMarkers(this.filteredSubviews());
}

});