class PetsController < ApplicationController

  
    def new
      # session[:method] = :new
      @pet = Pet.new()
    end
  
    def create
      @pet = Pet.new(pet_params)
      @pet.owner_id = current_user.id
        
      if @pet.save
        flash[:notice] = "Pet Created!"
        redirect_to pet_url(@pet)
      else
        flash[:notice] = "Invalid Pet! Please Try Again"
        render :new
      end
    end
  
    def show
      @pet = Pet.find(params[:id])
      @pet_rental_requests = PetRentalRequest.find_by_pet_id(@pet.id)
      @user = current_user
      render :show
    end
    
    def index
      @pets = Pet.all()
      user_token = session[:session_token]
      @user = current_user
      render :index
    end
    
    def edit
      @pet = Pet.find(params[:id])
      if !verify_owner
        flash[:notice]= "Sorry, YOU do not own this pet."
        redirect_to pet_url(@pet)
      else
        @pet = Pet.find(params[:id])
      end
    end
  
    def update
      @pet = Pet.find(params[:id])
      if !verify_owner
        flash[:notice] = "Sorry you do not own this pet"
        redirect_to pet_url(@pet)
      else
        @pet = Pet.find(params[:id])
        if @pet.update(pet_params)
          flash[:notice] = "Pet Updated!"
          redirect_to pet_url(@pet)
        else
          flash[:notice] = "Couldn't Update Pet"
          render :edit
        end
      end
    end
  
    def destroy
      @pet = Pet.find(params[:id])
      @pet.destroy
      redirect_to pets_url
    end
    
    def verify_owner
      @pet.owner_id == current_user.id
    end
  
    private
  
    def pet_params
      params.require(:pet).permit(:owner_id, :name, :type, :age, :color, :gender, :gender, :image_url, :bio)
    end
  end
  