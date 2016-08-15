import React from 'react';
import { Route, IndexRoute } from 'react-router';

import NavBar from './components/navbar';
import Index from './components/index';
import CreatePost from './components/createPost';
import GetPost from './components/getPost';
import SignIn from './components/signIn';
import SignUp from './components/signUp';

import RequireAuth from './containers/requireAuth';

export default(
  <Route path="/" component={NavBar}>
    <IndexRoute component={Index} />
    <Route path="posts/create" component={RequireAuth(CreatePost)} />
    <Route path="posts/:id" component={GetPost} />
    <Route path="signin" component={SignIn} />
    <Route path="signup" component={SignUp} />
  </Route>
);
