# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users
  devise_scope :user do
    get 'login', to: 'devise/sessions#new'
    get 'logout', to: 'devise/sessions#destroy'
  end
  get '/auth/:provider/callback', to: 'sessions#create'

  resources :training_templates do
    resources :workouts, except: :index
  end
  post 'workouts/new' => 'workouts#create'
  post 'training_templates/data' => 'training_templates#data'

  resources :workouts do
    post 'blocks/new' => 'blocks#create'
  end

  resources :blocks do
    post 'excercises/new' => 'excercises#create'
  end

  resources :excercises

  get 'calendar' => 'calendar#index'
  get '/' => redirect('/calendar'), as: 'root'
end
