import React, { Component } from 'react';
import Posts from '../containers/postsContainer';

// example class based component (smart component)
class Index extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
  }

  render() {
    return (
      <div id="content">
        <h1>Welcome to the Orange Weekly Digest.</h1>
        <Posts />
      </div>
    );
  }
}

export default Index;
