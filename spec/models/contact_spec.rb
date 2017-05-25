require 'rails_helper'

RSpec.describe Contact, type: :model do
  let(:first_name) { 'Raj' }
  let(:last_name) { 'Singh' }
  let(:message) { 'Oh hello! This is a very nice message.' }
  let(:contact) {
    Contact.new(
      first_name: first_name,
      last_name: last_name,
      message: message)
    }

  it 'should validate acceptable email addresses' do
    good_email = 'i_like_dragons@gmail.com'
    international_email = 'bad-ideas@brexit.co.uk'

    contact.email = good_email
    expect(contact).to be_valid

    contact.email = international_email
    expect(contact).to be_valid
  end

  it 'should reject bad invalid email addresses' do
    missing_domain_email = 'unicorns'
    missing_tld_email = 'OMG@bees-not-the-bees'

    contact.email = missing_domain_email
    expect(contact).to_not be_valid

    contact.email = missing_tld_email
    expect(contact).to_not be_valid
  end
end
