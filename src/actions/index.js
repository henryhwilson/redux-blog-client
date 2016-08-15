import Axios from 'axios';
import { browserHistory } from 'react-router';


const ROOT_URL = 'https://orange-weekly-digest.herokuapp.com/api'; // local is 'http://localhost:9090/api' cs52: 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=H_WILSON';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
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
    });
  };
}

export function createPost(post) {
  const fields = { title: post.title, content: post.content, tags: post.tags };
  return (dispatch) => {
    Axios.post(`${ROOT_URL}/posts${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      browserHistory.push('/');
    }).catch(error => {
    });
  };
}

export function updatePost(post) {
  const fields = { title: post.title, content: post.content, tags: post.tags };
  return (dispatch) => {
    Axios.put(`${ROOT_URL}/posts/${post.id}${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      console.log('Updated successfully');
    }).catch(error => {
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    Axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      browserHistory.push('/');
    }).catch(error => {
    });
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function loginAction(userId) {
  return {
    type: ActionTypes.AUTH_USER,
    user_id: userId,
  };
}

export function signinUser(user) {
  return (dispatch) => {
    Axios.post(`${ROOT_URL}/signin${API_KEY}`, user).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER, user_id: response.data.user_id });
      localStorage.setItem('user_id', response.data.user_id);
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

export function signupUser(user) {
  return (dispatch) => {
    Axios.post(`${ROOT_URL}/signup${API_KEY}`, user).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER, user_id: response.data.user_id });
      localStorage.setItem('user_id', response.data.user_id);
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    browserHistory.push('/');
  };
}
