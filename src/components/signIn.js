import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';

// example class based component (smart component)
class SignIn extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      email: '',
      password: '',
    };
  }

  signinUser() {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signinUser(user);
  }

  render() {
    let invalidLoginError = '';

    if (this.props.error.authError) {
      invalidLoginError = (<div id="error">{this.props.error.message}</div>);
      this.props.error.authError = false;
    }

    const SignInComponent = (
      <div id="account">
        {invalidLoginError}
        Email: <input type="text" placeholder="Email..." onChange={(event) => { this.setState({ email: event.target.value }); }} />
        Password: <input type="password" placeholder="Password..." onChange={(event) => { this.setState({ password: event.target.value }); }} />
        <div>
          <button onClick={() => { this.signinUser(); }}>Login</button>
        </div>
      </div>);

    return (
      <div id="content">
        {SignInComponent}
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

export default connect(mapStateToProps, Actions)(SignIn);
