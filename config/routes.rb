# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  use_doorkeeper

  devise_for :users, controllers: {
    registrations: 'registrations',
    sessions: 'sessions',
    passwords: 'passwords',
    confirmations: 'confirmations'
  }

  devise_scope :user do
    get 'login' => 'sessions#new'
    post 'login' => 'sessions#create'
    get 'logout', to: 'sessions#destroy'
  end
  # get '/auth/:provider/callback', to: 'sessions#create' TODO: Omniauth

  resources :training_templates, only: %i[create destroy]

  resources :workouts, only: %i[create update destroy]
  post '/workouts/copy/:id' => 'workouts#copy'

  resources :blocks, only: %i[create update destroy]
  post '/blocks/copy/:id' => 'blocks#copy'

  resources :excercises, only: %i[create update destroy]

  resources :session_progressions, only: %i[create destroy]
  post '/session_progressions/bulk_create_sessions' => 'session_progressions#bulk_create_sessions'
  resources :progressions, only: %i[create update destroy]

  get 'calendar' => 'calendar#index'
  get 'calendar/:id' => 'calendar#show'
  get '/' => redirect('/calendar'), as: 'root'

  health_check_routes

  # http://rubyjunky.com/cleaning-up-rails-4-production-logging.html
  # keep this last!
  unless Rails.env.development?
    match('*path', via: :all, to: 'errors#not_found')
    get('/404' => 'errors#not_found')
  end
end
