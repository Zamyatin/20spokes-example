require 'rails_helper'

RSpec.describe ContactController, type: :controller do

  describe '#create' do
    let(:first_name) { 'Raj' }
    let(:last_name) { 'Singh' }
    let(:message) { 'Oh hello! This is a very nice message.' }
    let(:email) { 'raj@foreversingh.com' }
    let(:bad_email) { 'herpde@dpe'}

    context 'with valid params' do
      let (:params) {
        { format: :json,
          contact: { first_name: first_name, last_name: last_name, email: email, message: message }
        }
      }

      it 'returns a 201 (created) message with a notice' do
        post :create, params

        expect(response).to have_http_status(:created)
        expect(response.body).to include('Your message has been sent! Thank you for sharing!')
      end

      it 'issues a json object for json requests' do
        post :create, params

        expect(response.content_type).to eq("application/json")
      end

      it 'creates a contact' do
        expect{ post :create, params }.to change{ Contact.count }.by(1)
      end
    end

    context 'with bad params' do
      let (:params) {
        { format: :json,
          contact: { first_name: first_name, last_name: last_name, email: bad_email, message: message }
        }
      }

      it 'returns a 422 with errors' do
        post :create, params
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not create the contact' do
        expect{ post :create, params }.to change{ Contact.count }.by(0)
      end
    end
  end
end
