require 'spec_helper'

RSpec.describe Repair, :type => :model do

  before(:each) do
    user = FactoryBot.create(:user)
    car = Car.create(year: 2007, make: "Toyota", model: "Camry", user_id: User.first.id)
  end

  subject {
    described_class.new(title: "Oil Change", description: "Changed the oil using synthetic blend oil", car_id: Car.first.id)
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "should not be valid without a title" do
    subject.title = nil
    expect(subject).to_not be_valid
    subject.title = ""
    expect(subject).to_not be_valid
  end

  it "should not be valid without a description" do
    subject.description = nil
    expect(subject).to_not be_valid
    subject.description = ""
    expect(subject).to_not be_valid
  end

  it "should not be valid without an associated car" do
    subject.car_id = nil
    expect(subject).to_not be_valid
    subject.car_id = ""
    expect(subject).to_not be_valid
  end

end
