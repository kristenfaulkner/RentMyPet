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
          redirect_to pets_url
        # else
        #   @pet_rental_request.destroy
        #   flash[:notice] = "Sorry, Pet Taken On These Dates!"
        #   render 'new'
        # end
      else
        flash[:notice] = "Invalid Request! Please Try Again"
        render :new
      end
    end
  
    def index
      @pet= Pet.find(params[:pet_id])
    end
    
    def show
      @pet= Pet.find(params[:pet_id])
      @pet_rental_request = PetRentalRequest.find(params[:id])
      @current_user = self.current_user
    end
    
    def edit
      @pet= Pet.find(params[:pet_id])
      @pet_rental_request = PetRentalRequest.find(params[:id])
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
        redirect_to pet_url(@pet)
        #redirect_to pets_url(Pet.find(@pet_rental_request.pet_id))
      elsif params[:pet_rental_request][:status] == "Deny"
        @pet_rental_request.update(:status => "Denied")
        flash[:notice] = "Rental Request Denied"
        @pet = Pet.find(@pet_rental_request.pet_id)
        session[:pet_id] = @pet.id
        redirect_to pet_url(@pet)
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
        redirect_to pet_url(@pet)
        #redirect_to pets_url(Pet.find(@pet_rental_request.pet_id))
      elsif params[:pet_rental_request][:status] == "Deny"
        @pet_rental_request.update(:status => "Denied")
        flash[:notice] = "Rental Request Denied"
        @pet = Pet.find(@pet_rental_request.pet_id)
        session[:pet_id] = @pet.id
        redirect_to pet_url(@pet)
        #redirect_to pets_url(Pet.find(@pet_rental_request.pet_id))
      end
    end
  
    def pet_rental_request_params
      params.require(:pet_rental_request).permit(:pet_id, :requester_id, :start_date, :end_date, :status)
    end
  end

