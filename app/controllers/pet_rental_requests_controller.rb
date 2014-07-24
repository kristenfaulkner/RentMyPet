class PetRentalRequestsController < ApplicationController
  
    def new
      @pet_rental_request = PetRentalRequest.new()
      @pet = Pet.find(params[:pet_id])
    end
  
    def create
      @pet_rental_request = PetRentalRequest.new(pet_rental_request_params)
    
      if @pet_rental_request.save
        # if @pet_rental_request.overlapping_requests.empty?
          flash[:notice] = "Rental Request Created!"
          render json: @pet_rental_request
        # else
        #   @pet_rental_request.destroy
        #   flash[:notice] = "Sorry, Pet Taken On These Dates!"
        #   render 'new'
        # end
      else
        flash[:notice] = "Invalid Request! Please Try Again"
        render json: @pet_rental_request.errors.full_messages, status: :unprocessable_entity
      end
    end
  
    def index
      @pet= Pet.find(params[:pet_id])
      render json: @pet.pet_rental_requests
    end
    
    def show
      @pet= Pet.find(params[:pet_id])
      @pet_rental_request = PetRentalRequest.find(params[:id])
      render json: @pet_rental_request
    end
    
    def edit
      @pet= Pet.find(params[:pet_id])
      @pet_rental_request = PetRentalRequest.find(params[:id])
      render json: @pet_rental_requests
    end
    
    def update
      @pet_rental_request = PetRentalRequest.find(params[:id])
      
      if params[:pet_rental_request][:status] == "Approve"
        @pet_rental_request.update(:status => "Approved")
      
        @pet_rental_request.overlapping_pending_requests.each do |request|
          request.update(:status => "Denied")
        end
      
        flash[:notice] = "Rental Request Approved"
        @pet = Pet.find(@pet_rental_request.pet_id)
        session[:pet_id] = @pet.id
        render json: @pet.pet_rental_requests
        #redirect_to pets_url(Pet.find(@pet_rental_request.pet_id))
      elsif params[:pet_rental_request][:status] == "Deny"
        @pet_rental_request.update(:status => "Denied")
        flash[:notice] = "Rental Request Denied"
        @pet = Pet.find(@pet_rental_request.pet_id)
        session[:pet_id] = @pet.id
        render json: @pet.pet_rental_requests.errors.full_messages, status: :unprocessable_entity
        #redirect_to pets_url(Pet.find(@pet_rental_request.pet_id))
      end
    end
    
    def respond
      @pet_rental_request = PetRentalRequest.find(params[:id])
      
      if params[:pet_rental_request][:status] == "Approve"
        @pet_rental_request.update(:status => "Approved")
      
        @pet_rental_request.overlapping_pending_requests.each do |request|
          request.update(:status => "Denied")
        end
      
        flash[:notice] = "Rental Request Approved"
        @pet = Pet.find(@pet_rental_request.pet_id)
        session[:pet_id] = @pet.id
        render json: @pet.pet_rental_requests
        
      elsif params[:pet_rental_request][:status] == "Deny"
        @pet_rental_request.update(:status => "Denied")
        flash[:notice] = "Rental Request Denied"
        @pet = Pet.find(@pet_rental_request.pet_id)
        session[:pet_id] = @pet.id
        redirect_to pet_url(@pet)
        render json: @pet.pet_rental_requests
      end
    end
  
    def pet_rental_request_params
      params.require(:pet_rental_request).permit(:pet_id, :requester_id, :start_date, :end_date, :status)
    end
  end

