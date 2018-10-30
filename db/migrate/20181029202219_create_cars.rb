class CreateCars < ActiveRecord::Migration[5.2]
  def change
    create_table :cars do |t|
      t.integer :year, null: false
      t.string :make, null: false
      t.string :model, null: false
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
