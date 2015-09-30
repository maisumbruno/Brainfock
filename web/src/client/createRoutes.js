import App from './app/app.react';
import Home from './pages/home.react';
import Login from './pages/auth.react';
import Me from './pages/me.react';
import NotFound from './pages/notFound.react';
import React from 'react';
import Todos from './pages/todos.react';
import {IndexRoute, Route} from 'react-router';

import Wiki from './wiki/pages/wiki';
import WikiEdit from './wiki/pages/edit';

export default function createRoutes(getState) {

  function requireAuth(nextState, replaceState) {
    const loggedIn = getState().users.viewer;
    if (!loggedIn) {
      replaceState({nextPathname: nextState.location.pathname}, '/login');
    }
  }

 /* <Route path=�/boards�>
  <Route path=�/�> render list </Route>
    <Route path=�/:id�> render id </Route>
      <Route path=�/:id/todos�>.. </Route>
      </Route>*/

  /*
   <Route component={require('./projects/index.js')} path="projects">
   <Route component={require('./boards/pages/board.js')}  path="/project/:board_id">
   <Route component={require('./boards/pages/topic.js')}  path="issues" />
   </Route>
   </Route>
   */
  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={Login} path="login" />
      <Route component={Me} onEnter={requireAuth} path="me" />
      <Route component={Todos} path="todos" />

      <Route component={require('./boards/pages/index.js')} name="boards" path="boards"/>
      <Route component={require('./boards/pages/board.js')} name="board" path="/board/:board_id">
        <Route component={require('./boards/pages/topic.js')} name="board_topic" path="topic/:id" />
      </Route>

      <Route path="/projects" component={require('./projects/index')}>
        <Route component={require('./projects/project-wrapper')}  >
          <Route component={require('./projects/dashboard')} path="/project/:board_id"  />
          <Route component={require('./projects/issues')} path="/project/:board_id/issues" />
          <Route component={require('./projects/users')} path="/project/:board_id/users" />
        </Route>

        {/*
         <Route component={require('./boards/pages/board.js')} path="/project/:board_id" />
         <Route component={require('./boards/pages/topic.js')} path="issues" />
         <Route component={require('./boards/pages/topic.js')} path="boards" />
        */}
      </Route>

      <Route component={Wiki} path="wiki/:uid" />
      <Route component={WikiEdit} path="wiki/:uid/edit" />

      <Route component={NotFound} path="*" />
    </Route>
  );

}