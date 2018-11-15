require 'rails_helper'

RSpec.describe Api::V1::CarsController, type: :controller do

  before(:each) do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    user = FactoryBot.create(:user)
    sign_in user
  # let!(:user) { FactoryBot.create(:user) }
  end
  let!(:car) { Car.create(year: 2007, make: "Toyota", model: "Camry", user_id: User.first.id ) }

  describe "GET#index" do
    it "should return a list of the users cars" do

      get :index, params: { user_id: subject.current_user.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"

      expect(returned_json.length).to eq 1

      expect(returned_json[0]["year"]).to eq 2007
      expect(returned_json[0]["make"]).to eq "Toyota"
      expect(returned_json[0]["model"]).to eq "Camry"
      expect(returned_json[0]["user_id"]).to eq subject.current_user.id
      expect(returned_json[0]["repair_count"]).to eq 0
    end
  end

  describe "GET#show" do
    it "should return a single car" do

      get :show, params: { id: Car.first.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
      expect(returned_json.length).to eq 8
      expect(returned_json["year"]).to eq 2007
      expect(returned_json["make"]).to eq "Toyota"
      expect(returned_json["model"]).to eq "Camry"
      expect(returned_json["user_id"]).to eq subject.current_user.id
    end
  end

  describe "POST#create" do
    it "creates a new car" do

      post_json = { car: {year: 2009, make: "Nissan", model: "350z"}, user_id: User.first.id}
      prev_count = Car.count
      post(:create, params: post_json)

      expect(Car.count).to eq(prev_count + 1)
    end
  end

end
