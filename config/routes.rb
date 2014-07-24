Rails.application.routes.draw do
  
  root :to => "sessions#new"
    
  resources :users
  resource :session, :only => [:create, :destroy, :new]
  resources :pets do
    resources :pet_rental_requests
  end
  
  get '/about', :to => 'static_pages#about', as: :about_page
  get '/contact', :to => 'static_pages#contact', as: :contact_page
end
