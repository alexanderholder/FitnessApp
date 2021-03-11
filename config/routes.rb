Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # this is because they dont give you reset instructions
  devise_for :users, :controllers => {
    :registrations => 'registrations',
    :sessions => 'sessions'
  }
  devise_scope :user do
    get "login" => "sessions#new"
    post "login" => "sessions#create"
    get 'logout', to: 'sessions#destroy'
  end
  # get '/auth/:provider/callback', to: 'sessions#create' TODO: Omniauth

  resources :training_templates, only: [:create, :destroy]

  resources :workouts, only: [:create, :update, :destroy]
  post '/workouts/copy/:id' => 'workouts#copy'

  resources :blocks, only: [:create, :update, :destroy]
  post '/blocks/copy/:id' => 'blocks#copy'

  resources :excercises, only: [:create, :update, :destroy]

  get 'calendar' => 'calendar#index'
  get 'calendar/:id' => 'calendar#show'
  get '/' => redirect('/calendar'), as: 'root'

  health_check_routes

  # http://rubyjunky.com/cleaning-up-rails-4-production-logging.html
  # keep this last!
  unless Rails.env.development?
    match("*path", via: :all, to: "errors#not_found")
    get("/404" => "errors#not_found")
  end
end
