class Car < ApplicationRecord
  belongs_to :user

  validates :year, presence: true, length: { is: 4 }, numericality: { only_integer: true }
  validates :make, presence: true
  validates :model, presence: true

end
