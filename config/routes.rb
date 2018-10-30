Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  resources :users, only: :show
  namespace :api do
    namespace :v1 do
      resources :current_user, only: [:index, :show] do
        resources :cars, only: [:index, :show]
      end
    end
  end



  resources :cars, only: [:index, :show]
end
