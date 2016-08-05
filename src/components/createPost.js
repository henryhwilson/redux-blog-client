import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { browserHistory } from 'react-router';

// example class based component (smart component)
class CreatePost extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      title: '',
      tags: '',
      content: '',
    };
  }

  createPost() {
    const post = {
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
    };
    this.props.createPost(post);
  }

  cancelCreate() {
    browserHistory.push('/');
  }

  render() {
    const PostComponent = (<div id="editPost">
      Title: <input type="text" placeholder="title..." onChange={(event) => { this.setState({ title: event.target.value }); }} />
      Tags: <input type="text" placeholder="tags..." onChange={(event) => { this.setState({ tags: event.target.value }); }} />
      <textarea onChange={(event) => { this.setState({ content: event.target.value }); }} />
      <div>
        <button onClick={() => { this.createPost(); }}>Submit</button>
        <button onClick={() => { this.cancelCreate(); }}>Cancel</button>
      </div>
    </div>);

    return (
      <div id="content">
        {PostComponent}
      </div>
    );
  }
}

export default connect(null, Actions)(CreatePost);
