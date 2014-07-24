  // <!-- set pet owner id to current user will happen on the rail's side?'-->
  
  // RentMyKitty.Views.PetsNewView = Backbone.View.extend({
  //   template: JST["pets/form"],
  //
  //   events: {
  //     "submit form": "submit"
  //   },
  //
  //   render: function () {
  //     var renderedContent = this.template();
  //     this.$el.html(renderedContent);
  //
  //     return this;
  //   },
  //
  //   submit: function (event) {
  //     event.preventDefault();
  //
  //     var params = $(event.currentTarget).serializeJSON();
  //     var newPet = new RentMyKitty.Models.Pet(params["pet"]);
  //
  //     newPet.save({}, {
  //       success: function () {
  //         RentMyKitty.Collections.pets.add(newPet);
  //         var path = "#/pets/" + newPet.get('id');
  //         Backbone.history.navigate(path, { trigger: true });
  //       }
  //     });
  //   }
  // });