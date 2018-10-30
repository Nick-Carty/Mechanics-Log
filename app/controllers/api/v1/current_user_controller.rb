class Api::V1::CurrentUserController < ApplicationController
  def show

    render json: current_user
  end
end
