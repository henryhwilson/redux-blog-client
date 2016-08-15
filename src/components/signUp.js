import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';

// example class based component (smart component)
class SignUp extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      full_name: '',
      email: '',
      password: '',
    };

    this.signupUser = this.signupUser.bind(this);
  }

  signupUser() {
    const user = {
      email: this.state.email,
      full_name: this.state.full_name,
      password: this.state.password,
    };
    this.props.signupUser(user);
  }

  render() {
    let invalidLoginError = '';

    if (this.props.error.authError) {
      invalidLoginError = (<div id="error">{this.props.error.message}</div>);
      this.props.error.authError = false;
    }

    const SignUpComponent = (<div id="account">
      {invalidLoginError}
      Full Name: <input type="text" placeholder="Full Name..." onChange={(event) => { this.setState({ full_name: event.target.value }); }} />
      Email: <input type="text" placeholder="Email..." onChange={(event) => { this.setState({ email: event.target.value }); }} />
      Password: <input type="password" placeholder="Password..." onChange={(event) => { this.setState({ password: event.target.value }); }} />
      <div>
        <button onClick={() => { this.signupUser(); }}>Create Account</button>
      </div>
    </div>);

    return (
      <div id="content">
        {SignUpComponent}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    auth: state.auth,
    error: state.error,
  });
};

export default connect(mapStateToProps, Actions)(SignUp);
