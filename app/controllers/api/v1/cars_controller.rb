class Api::V1::CarsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def index
    render json: current_user.cars
  end

  def show
    render json: Car.find(params[:id])
  end

  def create
    @user = User.find(params[:user_id])
    car = Car.new(car_params)
    car.user=@user
    if car.save
      render json: { car: car }, adapter: :json
    else
      render json: { error: car.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    car = Car.find(params[:id])
    if current_user.id == car.user_id
      car.destroy
      render json: { car_id: car.id}
    else
      render json: { error: "You must be an admin to delete"}, status: :unprocessable_entity
    end
  end

  private

  def car_params
    params.require(:car).permit(:year, :make, :model)
  end

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end
