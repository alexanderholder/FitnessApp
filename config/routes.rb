Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  devise_for :users
  devise_scope :user do
    get 'login', to: 'devise/sessions#new'
    get 'logout', to: 'devise/sessions#destroy'
  end
  # get '/auth/:provider/callback', to: 'sessions#create' TODO: Omniauth

  post 'training_templates/data' => 'training_templates#data'

  resources :training_templates, only: [:create, :destroy]
  resources :workouts, only: [:create, :update, :destroy]
  resources :blocks
  resources :excercises

  get 'calendar' => 'calendar#index'
  get '/' => redirect('/calendar'), as: 'root'
end
