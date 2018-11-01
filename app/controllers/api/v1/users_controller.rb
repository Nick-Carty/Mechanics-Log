class Api::V1::UsersController < ApplicationController
  # rename this controller to user controller



  def show

    # render json: { user: current_user, cars: current_user.all }


    render json: current_user

# Old Notes
    # Go to the Rails API lesson in Week 6 for guidance
    # 1) Add activemodel serializers to your gemfile
    # 2) Create a UserSerializer
     #
     # for putting together a fancy serializer review Brianna's serializer clinic
    # class UserSerializer < ...
      # attributes: name, location, age
      # has_many :cars

      # calling "has_many: cars" will actually trigger ActiveModel Serializer to look for a car serailizer as well, so you may want to create one of those

  end
end
