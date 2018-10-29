require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    first_name { 'Charles' }
    last_name { 'Xavier' }
    user_name { 'Xman1' }
    password { 'password' }
    password_confirmation { 'password' }
    role { 'member' }
  end

end
