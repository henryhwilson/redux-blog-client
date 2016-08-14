import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as Actions from '../actions';

// example class based component (smart component)
class Layout extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.signoutUser();
  }

  render() {
    const signIn = (<div><Link to="/signin" id="link">Sign In</Link><Link to="/signup" id="link">Create Account</Link></div>);
    const signOut = (<Link to="#signout" onClick={() => { this.signOut(); }} id="link">Logout</Link>);

    let accountLinks;
    console.log('state is');
    console.log(this.props.auth);
    if (this.props.auth && this.props.auth.authenticated) {
      accountLinks = signOut;
    } else {
      accountLinks = signIn;
    }

    return (
      <div>
        <nav>
          <Link to="/" id="logo">Orange Weekly Digest</Link>
          <div>
            <Link to="/posts/create" id="link">+ Create Post</Link>
            {accountLinks}
          </div>
        </nav>
        <div id="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    auth: state.auth,
  });
};

export default connect(mapStateToProps, Actions)(Layout);
