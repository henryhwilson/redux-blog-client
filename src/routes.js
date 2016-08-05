import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './components/layout';
import Index from './components/index';
import CreatePost from './components/createPost';
import GetPost from './components/getPost';

export default(
  <Route path="/" component={Layout}>
    <IndexRoute component={Index} />
    <Route path="posts/create" component={CreatePost} />
    <Route path="posts/:id" component={GetPost} />
  </Route>
);
