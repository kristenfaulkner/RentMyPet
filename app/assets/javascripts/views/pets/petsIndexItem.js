RentMyKitty.Views.PetsIndexItem = Backbone.CompositeView.extend({
  template: JST["pets/index_item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
},
  
  render: function () {
    var view = this;
    var renderedContent = this.template({
      pet: this.model
    });

    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});