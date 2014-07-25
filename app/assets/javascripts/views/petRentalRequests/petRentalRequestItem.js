RentMyKitty.Views.PetRentalRequestItem = Backbone.CompositeView.extend({
  template: JST["pet_rental_requests/index_item"],
  className: "rental-request-item",
  tagName: "tr",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var view = this;
    var renderedContent = view.template({
      pet: view.model.pet()
    });
    view.$el.html(renderedContent);
    return view;
  }
});