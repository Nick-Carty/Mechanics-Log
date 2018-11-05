Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show] do
        resources :cars, only: [:index, :create]
      end
      resources :cars, only: [:show] do
        resources :repairs, only: [:index, :show, :create]
      end
    end
  end

  resources :users, only: [:show] do
    resources :cars, only: [:new]
  end

  resources :cars, only: [:show] do
    resources :repairs, only: [:new, :show]
  end
end
