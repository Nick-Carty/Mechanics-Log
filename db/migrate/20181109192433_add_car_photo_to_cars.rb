class AddCarPhotoToCars < ActiveRecord::Migration[5.2]
  def change
    add_column :cars, :car_photo, :string
  end
end
