import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';

// example class based component (smart component)
class GetPost extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      isEditing: false,
      title: '',
      tags: '',
      content: '',
    };

    this.editPost = this.editPost.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.updatePost = this.updatePost.bind(this);
  }

  componentWillMount() {
    console.log('Fetching post!');
    this.props.fetchPost(this.props.params.id);
  }

  editPost() {
    console.log('Editing mode');
    this.setState({ isEditing: true });
  }

  cancelEdit() {
    this.setState({ isEditing: false });
  }

  deletePost() {
    this.props.deletePost(this.props.params.id);
  }

  updatePost() {
    const post = {
      id: this.props.params.id,
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
    };
    this.props.updatePost(post);
  }

  render() {
    let PostComponent = '';

    console.log('Rendering!');

    console.log(this.props.state);

    if (this.props.state.posts.post != null) {
      const post = this.props.state.posts.post;
      if (this.state.isEditing === true) {
        PostComponent = (<div id="editPost">
          Title: <input type="text" placeholder="title..." onChange={(event) => { this.setState({ title: event.target.value }); }} defaultValue={post.title} />
          Tags: <input type="text" placeholder="tags..." onChange={(event) => { this.setState({ tags: event.target.value }); }} defaultValue={post.tags} />
          <textarea onChange={(event) => { this.setState({ content: event.target.value }); }} defaultValue={post.content} />
          <div>
            <button onClick={() => { this.updatePost(); }}>Submit</button>
            <button onClick={() => { this.cancelEdit(); }}>Cancel</button>
          </div>
        </div>);
      } else {
        PostComponent = (<div>
          <h1>{post.title}</h1>
          <h2>Tags: {post.tags}</h2>
          <p>{post.content}</p>
          <div>
            <button onClick={() => { this.editPost(); }}>Edit</button>
            <button onClick={() => { this.deletePost(); }}>Delete</button>
          </div>
        </div>);
      }
    }

    return (
      <div id="content">
        {PostComponent}
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    state,
  }
);

export default connect(mapStateToProps, Actions)(GetPost);
