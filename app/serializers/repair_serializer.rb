class RepairSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :createdDate, :updatedDate

  belongs_to :car

  def createdDate
    timezone = 'Eastern Time (US & Canada)'
    object.created_at.in_time_zone(timezone).strftime("%B %d %y %I:%M%p")
  end

  def updatedDate
    timezone = 'Eastern Time (US & Canada)'
    object.updated_at.in_time_zone(timezone).strftime("%B %d %y %I:%M%p")
  end

end
