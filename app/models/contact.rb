class Contact < ActiveRecord::Base
  attr_accessor :first_name, :last_name, :email, :message

  validates_presence_of :first_name, :last_name, :email, :message
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, on: :create
end
