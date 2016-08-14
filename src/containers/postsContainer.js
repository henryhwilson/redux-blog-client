import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Link } from 'react-router';


// example class based component (smart component)
class Posts extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    console.log('abt to print: ');
    console.log(this.props.posts);

    let PostsComponent = '';

    if (this.props.posts != null) {
      PostsComponent = this.props.posts.map((post) =>
        <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link><span id="tags">{post.tags}</span></li>
      );
    }

    return (
      <ul>
        {PostsComponent}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    posts: state.posts.all,
  });
};

// react-redux glue -- outputs Container that know state in props
export default connect(mapStateToProps, Actions)(Posts);
