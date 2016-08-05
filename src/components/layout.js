import React, { Component } from 'react';
import { Link } from 'react-router';

// example class based component (smart component)
class Layout extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
  }

  render() {
    return (
      <div>
        <nav>
          <Link to="/" id="logo">Orange Weekly Digest</Link>
          <Link to="/posts/create" id="link">+ Create Post</Link>
        </nav>
        <div id="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
