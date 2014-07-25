RentMyKitty.Views.PetsShowView = Backbone.View.extend({
  
  template: JST['pets/show'],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.petRentalRequests(), "sync", this.render);
    // this.listenTo(this.model.petRentalRequests(), "add", this.render);
    // this.listenTo(this.model.petRentalRequests(), "remove", this.render);

    // var requestNewView =
    //       new RentMyKitty.Views.petRentalRequestNewView({ model: this.model });
    //     this.addSubview(".lists-new", listsNewView);

    // this.model.petRentalRequests().each(this.addPetRentalRequest.bind(this));
  },
  
  addPetRentalRequest: function (request) {
    alert("wow!");
      // var listsShowOne =
      //   new Trello.Views.ListsShowOne({ model: list });
      // this.addSubview(".lists", listsShowOne);
    },
    
  render: function () {
    var view = this;
    var renderedContent = view.template({ pet: this.model });
    view.$el.html(renderedContent);
    return view;
  }
  
});