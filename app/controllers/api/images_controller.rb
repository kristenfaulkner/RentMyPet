module Api
  class ImagesController < ApplicationController
  
    def index
      render :json => Image.all
    end
  
    def create
      @image = Image.new(image_params)
      if @image.save
        render :json => @image
      else
        render :json => @image.errors.full_messages
      end
    end
    
    def destroy
      @image = Image.find(params[:id])
      @image.destroy
    end
  
    def image_params
      params.require(:image).permit(:image_url, :pet_id)
    end
  end
end