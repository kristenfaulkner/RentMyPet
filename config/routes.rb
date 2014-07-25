Rails.application.routes.draw do
  
  root :to => "static_pages#root"
    
  resources :users, :only => [:new]
  resource :session, :only => [:create, :destroy, :new]
  
  
  # resources :pets do
  #   resources :pet_rental_requests do
  #     member do
  #       post 'respond'
  #     end
  #   end
  # end
    
    
  namespace :api, defaults: { format: :json } do
    resources :pets 
    resources :pet_rental_requests
  end
  
  get '/about', :to => 'static_pages#about', as: :about_page
  get '/contact', :to => 'static_pages#contact', as: :contact_page
end
