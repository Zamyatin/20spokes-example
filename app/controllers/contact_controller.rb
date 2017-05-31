class ContactController < ApplicationController
  def index
  end

  def create
    @contact = Contact.new(contact_params)
    respond_to do |format|
      if @contact.save
        format.json { render status: :created, json: {
          notice: 'Your message has been sent! Thank you for sharing!' }
        }
      else
        format.json { render status: :unprocessable_entity, json: @contact.errors}
      end
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:first_name, :last_name, :email, :message)
  end
end
