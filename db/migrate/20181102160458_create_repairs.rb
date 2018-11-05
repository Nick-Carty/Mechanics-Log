class CreateRepairs < ActiveRecord::Migration[5.2]
  def change
    create_table :repairs do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.belongs_to :car, null: false

      t.timestamps null: false
    end
  end
end
