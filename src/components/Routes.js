import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Cards from '../containers/Cards';
import Login from './Login';
import MovieForm from './MovieForm';
import AuthChecker from './AuthChecker';

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Cards />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <AuthChecker>
          <Route path="/admin" exact>
            <Cards />
          </Route>
          <Route path="/movie/create" exact>
            <MovieForm />
          </Route>
          <Route path="/movie/edit/:id" exact>
            <MovieForm />
          </Route>
        </AuthChecker>
      </Switch>
    </div>
  );
}
