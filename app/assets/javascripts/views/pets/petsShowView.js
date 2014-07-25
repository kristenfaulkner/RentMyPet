RentMyKitty.Views.PetsShowView = Backbone.View.extend({
  
  template: JST['pets/show'],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var view = this;
    var renderedContent = view.template({ pet: this.model });
    view.$el.html(renderedContent);
    return view;
  }
  
});