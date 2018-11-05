class Api::V1::RepairsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def index
    @car = Car.find(params[:car_id])
    @repairs = @car.repairs
    render json: @car.repairs
  end

  def show
  end

  private

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end
