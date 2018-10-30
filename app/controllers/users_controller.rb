class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def show
    render "homes/index"
  end
end
