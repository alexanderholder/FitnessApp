Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :training_templates do
    resources :workouts, except: :index
  end
  post "workouts/new" => "workouts#create"

  resources :workouts do
    post "blocks/new" => "blocks#create"
  end

  resources :blocks do
    post "excercises/new" => "excercises#create"
  end

  resources :excercises

  # root to: 'home#index'
  get "/" => redirect("/training_templates"), as: "root"

  get '/auth/:provider/callback', to: 'sessions#create'
end
