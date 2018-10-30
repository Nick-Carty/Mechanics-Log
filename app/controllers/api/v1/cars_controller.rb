class Api::V1::CarsController < ApplicationController
  before_action :authenticate_user!
  def index
    render json: current_user.cars
  end

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end
