require 'spec_helper'

RSpec.describe Car, :type => :model do

  before(:each) do
    user = FactoryBot.create(:user)
  end

  subject {
    described_class.new(year: 2007, make: "Toyota", model: "Camry", user_id: User.first.id)
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "should not be valid without a year" do
    subject.year = nil
    expect(subject).to_not be_valid
    subject.year = ""
    expect(subject).to_not be_valid
  end

  it "should not be valid without a make" do
    subject.make = nil
    expect(subject).to_not be_valid
    subject.make = ""
    expect(subject).to_not be_valid
  end

  it "should not be valid without a model" do
    subject.model = nil
    expect(subject).to_not be_valid
    subject.model = ""
    expect(subject).to_not be_valid
  end

  it "should not be valid without an associated user" do
    subject.user_id = nil
    expect(subject).to_not be_valid
    subject.user_id = ""
    expect(subject).to_not be_valid
  end

end
