class ContactController < ApplicationController
  def index
  end

  def create
    @contact = Contact.new(contact_params)
    respond_to do |format|
      if @contact.save
        format.json { render json: {
          notice: 'Your message has been sent! Thank you for sharing!' }
        }
      else
        format.json { render json: @contact.errors }
      end
    end
  end

  private

  def contact_params
    params.permit(:first_name, :last_name, :email, :message)
  end
end
