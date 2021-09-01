# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.0'
# INSTRUCTIONS TO UPGRADE RAILS:
# if you're doing a minor update (6.0.3.2 -> 6.0.3.3, or 6.0.2 -> 6.0.3), update the version number above.
# then run these commands:
#  => bundle update rails actioncable actionmailbox actionmailer actionpack actiontext actionview activejob activemodel activerecord activestorage activesupport railties rails-i18n marcel --conservative
#  => bundle update rails actioncable actionmailbox actionmailer actionpack actiontext actionview activejob activemodel activerecord activestorage activesupport railties rails-i18n marcel --conservative --gemfile GemfileNext
#  => bundle exec tapioca sync
# if they have all run successfully you're good to go. commit your changes and start a PR to run tests.
#
# NOTE: If Sorbet complains about an error @ sorbet/rbi/gems/activerecord@X.X.X.X.rbi:4977 #def create_table(table_name, **options); end
#  This is an ongoing issue and the line should be commented out before proceeding (tapioca sync will uncomment it)
#
# for MAJOR Rails upgrades (5.2 -> 6.0, 6.0 -> 6.1, etc), it's a bit different.
# first, comment out the `gem "rails"` call line above and the `gem "rails-i18n"` call below, and START UNCOMMENTING HERE:
# running_next_rails = ["1", "true"].include?(ENV["RAILS_NEXT"])
# gem "rails", (running_next_rails ? "6.1.3.2" : "6.0.3.7")
# gem "rails-i18n", (running_next_rails ? "~> 6" : "~> 5")
# END UNCOMMENTING HERE ^
# update the relevant version numbers in those conditionals ^ true case is next version. false case is current version.
# then open the `GemfileNext` file and read it for further instructions.

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.1.3.0', '>= 6.0'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 4.3'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'haml'
gem 'react-rails'
gem 'tailwindcss-rails', '~> 0.3.3'
gem 'webpacker'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
# gem 'coffee-rails', '~> 5.0'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'web-console', '>= 3.3.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of chromedriver to run system tests with Chrome
  # gem 'chromedriver-helper' deprecated
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# gem 'omniauth'
# # this patches a bug for omniauth
# gem 'omniauth-rails_csrf_protection', '~> 0.1'

# authentication / authorization
gem 'devise' # User authentication
gem 'doorkeeper' # API authentication / OAuth providing
gem 'pundit' # authorization

gem 'oj', '~> 3' # fast json dumps

gem 'deep_cloneable', '~> 3.0.0'

# ruby best practice
gem 'sorbet', group: :development
gem 'sorbet-progress', group: %i[development test]
gem 'sorbet-rails'
gem 'sorbet-runtime'
gem 'tapioca', group: %i[development test], require: false

gem 'rubocop'
gem 'rubocop-performance', require: false
gem 'rubocop-rails'

gem 'health_check' # makes AWS health check cheaper
