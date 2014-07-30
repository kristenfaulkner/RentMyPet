RentMyKitty.Views.ImagesIndex = Backbone.CompositeView.extend({
  template: JST["images/index"],
  
  initialize: function() {
    this.listenTo(this.collection, "add", this.addImage);
    this.listenTo(this.collection, "remove", this.removeImage);
    this.collection.each(this.addImage.bind(this));
  },
  
  addImage: function (image) {
    var imageView = new RentMyKitty.Views.ImageItem({ 
      model: image, 
      collection: this.collection, 
      pet_id: this.model.id});
    this.addSubview(".show-page-images", imageView);
  },
  
  removeImage: function (image) {
    var subview = _.find(
      this.subviews(".show-page-images"),
      function (subview) {
        return subview.model === image;
      }
    );
    this.removeSubview(".show-page-images", subview);
  },


  render: function () {
    var view = this;
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});