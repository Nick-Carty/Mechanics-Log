Rails.application.routes.draw do
  root 'homes#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show] do
        resources :cars, only: [:index, :create]
      end
      resources :cars, only: [:show, :destroy, :update] do
        resources :repairs, only: [:index, :create]
      end
      resources :repairs, only: [:destroy, :update, :show]
    end
  end

  resources :users, only: [:show] do
    resources :cars, only: [:new]
  end

  resources :cars, only: [:show, :edit] do
    resources :repairs, only: [:new, :show]
  end

  resources :repairs, only: [:edit]

  get '*path', to: 'homes#index'
end
