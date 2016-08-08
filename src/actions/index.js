import Axios from 'axios';
import { browserHistory } from 'react-router';


const ROOT_URL = 'https://wilson-blog-server.herokuapp.com/api'; // local is 'http://localhost:9090/api' cs52: 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=H_WILSON';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  API_ERROR: 'API_ERROR',
};

export function fetchPosts() {
  return (dispatch) => {
    console.log('Fetching posts');
    Axios.get(`${ROOT_URL}/posts${API_KEY}`).then(response => {
      console.log('Fetched posts successfully');
      console.log(response.data);
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
    }).catch(error => {
      console.log('Fetched posts failed');
      dispatch({ type: ActionTypes.API_ERROR });
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    Axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      console.log('Fetched post successfully');
      console.log(response.data);
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    }).catch(error => {
      console.log('Fetched post failed');
      dispatch({ type: ActionTypes.API_ERROR });
    });
  };
}

export function createPost(post) {
  const fields = { title: post.title, content: post.content, tags: post.tags };
  return (dispatch) => {
    Axios.post(`${ROOT_URL}/posts${API_KEY}`, fields).then(response => {
      dispatch({ type: ActionTypes.CREATE_POST });
      browserHistory.push('/');
    }).catch(error => {
      dispatch({ type: ActionTypes.API_ERROR });
    });
  };
}

export function updatePost(post) {
  const fields = { title: post.title, content: post.content, tags: post.tags };
  return (dispatch) => {
    Axios.put(`${ROOT_URL}/posts/${post.id}${API_KEY}`, fields).then(response => {
      dispatch({ type: ActionTypes.UPDATE_POST });
      console.log('Updated successfully');
      browserHistory.push('/');
    }).catch(error => {
      dispatch({ type: ActionTypes.API_ERROR });
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    Axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      browserHistory.push('/');
    }).catch(error => {
      dispatch({ type: ActionTypes.API_ERROR });
    });
  };
}
