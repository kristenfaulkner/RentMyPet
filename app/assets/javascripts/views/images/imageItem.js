RentMyKitty.Views.ImageItem = Backbone.CompositeView.extend({
  template: JST["images/index_item"],
  className: 'show-page-image-box',
  // tagName: 'img',
  // className: "show-page-image",
  
  initialize: function () {
  },
  
  events: {
    "click button#delete-image" : "deleteImage"
  },
  
  deleteImage: function(event) {
    event.preventDefault();
    this.model.destroy();
    alert("image deleted");
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