Rails.application.routes.draw do
  
  root :to => "sessions#new"
    
  resources :users
  resource :session, :only => [:create, :destroy, :new]
  
  
  resources :pets do
    resources :pet_rental_requests do
      member do
        post 'respond'
      end
    end
  end
    
    
  namespace :api, defaults: { format: :json } do
    resources :pets do
      resources :pet_rental_requests do
        member do
          post 'respond'
        end
      end
    end
  end
  
  get '/about', :to => 'static_pages#about', as: :about_page
  get '/contact', :to => 'static_pages#contact', as: :contact_page
end
