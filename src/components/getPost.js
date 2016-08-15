import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Link } from 'react-router';

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

  componentWillUpdate() {
    this.props.fetchPost(this.props.params.id);
  }

  editPost() {
    console.log('Editing mode');
    if (this.props.post != null) {
      const post = this.props.post;
      this.setState({
        isEditing: true,
        title: post.title,
        tags: post.tags,
        content: post.content,
      });
    }
  }

  cancelEdit() {
    this.setState({ isEditing: false });
  }

  deletePost() {
    if (this.props.auth.authenticated && this.props.auth.user_id === this.props.post.author_id) {
      this.props.deletePost(this.props.params.id);
    }
  }

  updatePost() {
    const post = {
      id: this.props.params.id,
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
    };
    if (this.props.auth.authenticated && this.props.auth.user_id === this.props.post.author_id) {
      this.setState({ isEditing: false });
      this.props.updatePost(post);
      this.props.fetchPost(this.props.params.id);
    }
  }

  render() {
    let PostComponent = '';

    console.log('Rendering!');

    console.log(this.props.post);

    if (this.props.post != null) {
      const post = this.props.post;
      let editDeleteButtons = '';
      if (this.props.auth.authenticated && this.props.auth.user_id === this.props.post.author_id) {
        editDeleteButtons = (
          <div>
            <button onClick={() => { this.editPost(); }}>Edit</button>
            <button onClick={() => { this.deletePost(); }}>Delete</button>
          </div>);
      }
      if (this.state.isEditing === true) {
        PostComponent = (<div id="editPost">
          Title: <input type="text" placeholder="Title..." onChange={(event) => { this.setState({ title: event.target.value }); }} defaultValue={post.title} />
          Tags: <input type="text" placeholder="Tags..." onChange={(event) => { this.setState({ tags: event.target.value }); }} defaultValue={post.tags} />
          <textarea placeholder="Content..." onChange={(event) => { this.setState({ content: event.target.value }); }} defaultValue={post.content} />
          <div>
            <button onClick={() => { this.updatePost(); }}>Submit</button>
            <button onClick={() => { this.cancelEdit(); }}>Cancel</button>
          </div>
        </div>);
      } else {
        PostComponent = (<div>
          <h2><span id="tags-header">Author:</span> {post.author}</h2>
          <h2><span id="tags-header">Categories:</span> {post.tags}</h2>
          <div id="post-body">{post.content}</div>
          <div>
            {editDeleteButtons}
          </div>
        </div>);
      }
    }

    return (
      <div id="content">
        <h1><Link to="/" id="title-header">Recent Posts </Link> / {this.props.post ? this.props.post.title : ''} </h1>
        {PostComponent}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    post: state.posts.post,
    auth: state.auth,
  });
};

export default connect(mapStateToProps, Actions)(GetPost);
