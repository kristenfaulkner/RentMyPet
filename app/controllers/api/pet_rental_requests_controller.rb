module Api
  class PetRentalRequestsController < ApplicationController
  
    def create
      @pet_rental_request = PetRentalRequest.new(pet_rental_request_params)
      if @pet_rental_request.save
        puts params
          render json: @pet_rental_request
      else
        render json: @pet_rental_request.errors.full_messages, status: :unprocessable_entity
      end
    end
   
    def show
      @pet = Pet.find(params[:pet_id])
      @pet_rental_request = PetRentalRequest.find(params[:id])
      render json: @pet_rental_request
    end
    
    def update
      @pet_rental_request = PetRentalRequest.find(params[:id])
      if @pet_rental_request.update(pet_rental_request_params)

         @pet_rental_request.destroy_overlapping  
         render json: @pet_rental_request     
      else
        render json: @pet_rental_request.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    def destroy
      @pet_rental_request = PetRentalRequest.find(params[:id])
      @pet_rental_request.destroy
      render :json => {}
    end
  
    def pet_rental_request_params
      params.require(:pet_rental_request).permit(:pet_id, :requester_id, :start_date, :end_date, :status)
    end
  end
end

