class ContactController < ApplicationController
  def index
  end

  def create
    # Create and save model here
  end

  private

  def contact_params
    params.require(:contact).permit(:first_name, :last_name, :email, :message)
  end
end
