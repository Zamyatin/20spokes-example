class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      dataSubmitted: false
    }

    this.validEmailFormat = this.validEmailFormat.bind(this);
    this.validateHasContent = this.validateHasContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  displayName: "ContactForm"

  handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    // use some ES6 computed property syntax here:
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let data = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      message: this.state.message
    };

    $.ajax({
      type: 'POST',
      url:'/contact',
      data: data,
      dataType: 'json',

      success: () => {
        this.setState({ dataSubmitted: true })
      }
    })
  }

  validateHasContent(){
    const { firstName, lastName, email, message } = this.state;
    return firstName && lastName && email && message;
  }

  validEmailFormat(){
    let value = this.state.email;
    let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return validEmail.test(value)
  }

  renderFirstNameField() {
    return(
      <div className='form-group col-sm-4'>
        <label>First Name:</label>
        <input
          name='firstName'
          type='text'
          className='form-control'
          value={ this.state.firstName }
          placeholder='Ron'
          onChange={ this.handleInputChange }>
        </input>
      </div>
    )
  }

  renderLastNameField() {
    return(
      <div className='form-group col-sm-4'>
        <label>Last Name:</label>
        <input
          name='lastName'
          type='text'
          className='form-control'
          value={ this.state.lastName }
          placeholder='Swanson'
          onChange={ this.handleInputChange }>
        </input>
      </div>
    )
  }

  renderEmailField() {
    return(
      <div className='form-group col-sm-4'>
        <label>Email:</label>
        <input
          name='email'
          type='text'
          className='form-control'
          value={ this.state.email }
          placeholder='turkey@wrapitinbacon.com'
          onChange={ this.handleInputChange }>
        </input>
        { (!this.validEmailFormat())
          ? <div><span>Valid email format required.</span></div>
          : null
        }
      </div>
    )
  }

  renderMessageField() {
    return(
      <div className='form-group col-sm-12'>
        <label>Send us a lovely message!</label>
        <textarea
          name='message'
          type='text'
          className='form-control'
          value={ this.state.message }
          placeholder='Government is useless.'
          onChange={ this.handleInputChange }>
        </textarea>
      </div>
    )
  }

  renderSuccessMessage() {
    return(
      <div className='container'>
        <div className='col-sm-12'>
          <span>
            Thanks for sharing! Raj learned a whole lot this week in React just so you could do that! :D
          </span>
        </div>
      </div>
    )
  }

  render() {
    if (this.state.dataSubmitted === true){
      return this.renderSuccessMessage();
    } else {
      return(
        <div className='container'>
          <div className='col-sm-12'>
            <form onSubmit={ this.handleSubmit }>
              { this.renderFirstNameField() }
              { this.renderLastNameField() }
              { this.renderEmailField() }
              { this.renderMessageField() }
              <div className='col-sm-4 actions'>
                <button
                  disabled={ !(this.validateHasContent() && this.validEmailFormat()) }
                  className='btn btn-primary'>Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }
}

ContactForm.propTypes = {
  firstName: React.PropTypes.string,
  lastName: React.PropTypes.string,
  email: React.PropTypes.string,
  message: React.PropTypes.string,
  dataSubmitted: React.PropTypes.bool
};
