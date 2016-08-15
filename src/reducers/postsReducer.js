import { ActionTypes } from '../actions';

const posts = {
  all: [],
  post: null,
};

const PostsReducer = (state = { posts }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return Object.assign({}, state.posts, { all: action.payload });
    case ActionTypes.FETCH_POST:
      return Object.assign({}, state.posts, { post: action.payload });
    default:
      return posts;
  }
};

export default PostsReducer;
