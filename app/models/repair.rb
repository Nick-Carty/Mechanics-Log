class Repair < ApplicationRecord
  belongs_to :car

  validates :title, presence: true
  validates :description, presence: true
end
