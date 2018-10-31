Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  resources :users, only: :show
  namespace :api do
    namespace :v1 do
      resources :current_user, only: [:index, :show] do
        resources :cars, only: [:index, :show, :create, :new]
      end
    end
  end

  resources :current_user, only: [:show] do
    resources :cars, only: [:new]
  end
end
