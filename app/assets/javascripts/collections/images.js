RentMyKitty.Collections.Images = Backbone.Collection.extend({
  initialize: function (options) {
    this.pet = options.pet;
  },
  
  model: RentMyKitty.Models.Image,
  url: "/api/images",

  getOrFetch: function (id) {
    var images = this;
    var image;
    if (image = this.get(id)) {
      image.fetch();
    } else {
      image = new RentMyKitty.Models.Image({ id: id });
      image.fetch({
        success: function () { images.add(image); }
      });
    }

    return image;
  }
});
