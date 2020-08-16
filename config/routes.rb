Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :training_templates
  resources :workouts
  resources :blocks
  resources :excercises
  resources :params

  get "/" => redirect("/training_templates"), as: "root"
end
