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
    const SignUpComponent = (<div id="account">
      Full Name: <input type="text" placeholder="full name..." onChange={(event) => { this.setState({ full_name: event.target.value }); }} />
      Email: <input type="text" placeholder="email..." onChange={(event) => { this.setState({ email: event.target.value }); }} />
      Password: <input type="password" placeholder="password..." onChange={(event) => { this.setState({ password: event.target.value }); }} />
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
  });
};

export default connect(mapStateToProps, Actions)(SignUp);
