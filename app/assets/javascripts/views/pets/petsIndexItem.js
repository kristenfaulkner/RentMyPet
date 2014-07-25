RentMyKitty.Views.PetsIndexItem = Backbone.CompositeView.extend({
  template: JST["pets/index_item"],
  className: "wrapper",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
},

  render: function () {
    var view = this;
    var renderedContent = view.template({
      pet: view.model
    });
    view.$el.html(renderedContent);
    view.attachSubviews();
    return view;
  }
});