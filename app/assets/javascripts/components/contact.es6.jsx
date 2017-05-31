const fieldValidations = [
  validationRunner('firstName', 'First Name', FormValidator.required),
  validationRunner('lastName', 'Last Name', FormValidator.required),
  validationRunner('email', 'Email Address', FormValidator.required),
  validationRunner('email', 'Email Address', FormValidator.validateEmail),
  validationRunner('message', 'Message', FormValidator.required)
]
class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      showErrors: false,
      validationErrors: {}
    }
    // run validations on initial state
    this.state.validationErrors = runValidations(this.state, fieldValidations);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  displayName: "ContactForm"

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    // we want to compare a comprehensive new state against validations,
    // which means we need a way to copy state, update, and validate before
    // finalizing with a setState statement
    let newState = update(this.state, {
      [name]: { $set: value }
    });

    newState.validationErrors = runValidations(newState, fieldValidations)

    // use some ES6 computed property syntax here:
    this.setState(newState)
  }

  handleSubmit(e) {
    e.preventDefault();

    let package = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      message: this.state.message
    };

    $.ajax({
      type: 'POST',
      url:'/contact',
      data: package,
      dataType: 'json'
    })
  }

  render() {
    return(
      <div className='container'>
        <div className='col-sm-12'>
          <form onSubmit={ this.handleSubmit }>
            <div className='form-group col-sm-4'>
              <label>First Name:</label>
              <input
                name='firstName'
                type='text'
                className='form-control'
                value={ this.state.firstName }
                placeholder='First Name'
                showErrors={ this.state.showErrors}
                onChange={ this.handleInputChange }>
              </input>
            </div>
            <div className='form-group col-sm-4'>
              <label>Last Name:</label>
              <input
                name='lastName'
                type='text'
                className='form-control'
                value={ this.state.lastName }
                placeholder='Last Name'
                onChange={ this.handleInputChange }>
              </input>
            </div>
            <div className='form-group col-sm-4'>
              <label>Email:</label>
              <input
                name='email'
                type='text'
                className='form-control'
                value={ this.state.email }
                placeholder='Email Address'
                onChange={ this.handleInputChange }>
              </input>
            </div>
            <div className='form-group col-sm-12'>
              <label>Tell us something nice!</label>
              <textarea
                name='message'
                type='text'
                className='form-control'
                value={ this.state.message }
                placeholder='Send us your love!'
                onChange={ this.handleInputChange }>
              </textarea>
            </div>
            <div className='col-sm-4 actions'>
              <button className='btn btn-primary'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

ContactForm.propTypes = {
  firstName: React.PropTypes.string,
  lastName: React.PropTypes.string,
  email: React.PropTypes.string,
  message: React.PropTypes.string,
  showErrors: React.PropTypes.bool
};
