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
    const SignInComponent = (<div id="account">
      Email: <input type="text" placeholder="email..." onChange={(event) => { this.setState({ email: event.target.value }); }} />
      Password: <input type="password" placeholder="password..." onChange={(event) => { this.setState({ password: event.target.value }); }} />
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
  });
};

export default connect(mapStateToProps, Actions)(SignIn);
