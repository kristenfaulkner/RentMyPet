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
    "click #codeAddress" : "codeAddress",
    "click #start-date" : "repositionCatsDown",
    "click #end-date" : "repositionCatsDown",
    "click #end-date" : "repositionCatsDown",
    "mouseover #pets" : "repositionCatsUp",
    "changeDate #start-date" : "filterDates",
    "changeDate #end-date" : "filterDates",
    "click .checkbox-inline" : "filterColor"
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
  filterDates: function() {
    var view = this;
    view.resetPets();
    var view = this;
    var start = this.$("#start-date").val();
    var end = this.$("#end-date").val();
    if ((start != "") && (end != "")) {
        view.collection.each(function(pet) {
           var fname = pet.get('name');
           console.log(fname);
          if (!pet.validDates(start, end)) {
              console.log(pet);
            view.removePet(pet);
          }
      });
    }
  },
  
  filterColor: function(event) {
    var view = this;
    view.resetPets();
    var checked = this.$(".checkbox-inline").filter(":checked").toArray();
    if (checked.length > 0) {
      var colors = [];  
      checked.forEach(function(box) { colors.push(box.value)});
      this.collection.each(function(pet) {
        if ($.inArray(pet.get('color'), colors) < 0) {
          view.removePet(pet)
        }
      });
    }
  }
  
});

