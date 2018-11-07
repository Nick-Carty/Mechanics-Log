class Api::V1::RepairsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def index
    @car = Car.find(params[:car_id])
    @repairs = @car.repairs
    render json: @car.repairs
  end

  def show
    render json: Repair.find(params[:id])
  end

  def create
    @car = Car.find(params[:car_id])
    repair = Repair.new(repair_params)
    repair.car = @car
    if repair.save
      render json: { repair: repair }, adapter: :json
    else
      render json: { error: repair.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    repair = Repair.find(params[:id].to_i)
    @car = repair.car
    repair.attributes = {
      title: params[:title],
      description: params[:description]
    }
    if repair.save
      render json: @car
    else
      render json: { error: repair.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    repair = Repair.find(params[:id])
    if current_user.id == repair.car.user_id
      repair.destroy
      render json: { repair_id: repair.id}
    else
      render json: { error: "You must be an admin to delete"}, status: :unprocessable_entity
    end
  end

  private

  def repair_params
    params.require(:repair).permit(:title, :description)
  end

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end
