RentMyKitty.Views.ImageItem = Backbone.CompositeView.extend({
  template: JST["images/index_item"],
  className: 'show-page-image-box',

  initialize: function () {
  },

  events: {
    "click button.delete-image" : "deleteImage"
  },

  deleteImage: function(event) {
    event.preventDefault();
    if (confirm("Are you sure you would like to delete this image? This action cannot be undone")) {
      this.model.destroy();
      alert("Image deleted ");
    }
  },

  render: function () {
    var view = this;
    var renderedContent = view.template({
      model: view.model
    });
    view.$el.html(renderedContent);
    return view;
  }
});
