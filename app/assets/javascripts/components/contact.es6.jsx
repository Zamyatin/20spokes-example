class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    }

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  displayName: "ContactForm"

  // Figure out how to DRY this up with Computed properties (or whatever
  // the React equivalent is... These aren't purty.)

  handleFirstNameChange(e) {
    this.setState({firstName: e.target.value})
  }

  handleLastNameChange(e) {
    this.setState({lastName: e.target.value})
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }

  handleMessageChange(e) {
    this.setState({message: e.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    console.warn('submit has been triggered');
  }

  render() {
    return(
      <div className='container'>
        <div className='col-sm-12'>
          <form onSubmit={ this.handleSubmit }>
            <div className='form-group col-sm-4'>
              <label>First Name:</label>
              <input
                type='text'
                className='form-control'
                value={ this.state.firstName }
                placeholder='First Name'
                onChange={ this.handleFirstNameChange }>
              </input>
            </div>
            <div className='form-group col-sm-4'>
              <label>Last Name:</label>
              <input
                type='text'
                className='form-control'
                value={ this.state.lastName }
                placeholder='Last Name'
                onChange={ this.handleLastNameChange }>
              </input>
            </div>
            <div className='form-group col-sm-4'>
              <label>Email:</label>
              <input
                type='text'
                className='form-control'
                value={ this.state.email }
                placeholder='Email Address'
                onChange={ this.handleEmailChange }>
              </input>
            </div>
            <div className='form-group col-sm-12'>
              <label>Tell us something nice!</label>
              <textarea
                type='text'
                className='form-control'
                value={ this.state.message }
                placeholder='Send us your love!'
                onChange={ this.handleMessageChange }>
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
  message: React.PropTypes.string
};
