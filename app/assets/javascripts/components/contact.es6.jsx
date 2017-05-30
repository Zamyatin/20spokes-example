class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  displayName: "ContactForm"

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    // use some ES6 computed property syntax here:
    this.setState({
      [name]: value
    });
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
  message: React.PropTypes.string
};
