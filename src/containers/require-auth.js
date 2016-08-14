import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { browserHistory } from 'react-router';

export default function (ComposedComponent) {
  class RequireAuth extends Component {
    constructor(props) {
      super(props);

      // init component state here
      this.state = {};
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        browserHistory.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        browserHistory.push('/signin');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  const mapStateToProps = (state) => {
    return ({
      authenticated: state.auth,
    });
  };

  return connect(mapStateToProps, Actions)(RequireAuth);
}
