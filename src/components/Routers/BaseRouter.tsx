import React from 'react';
import { routes } from '@/constants/routes';
import Home from '@pages/Home';
import { Redirect, Route, Switch } from 'react-router-dom';

const BaseRouter = () => {
  return (
    <Switch>
      <Route exact path={routes.home} component={Home} />
      <Route exact path='*'>
        <Redirect to={routes.home} />
      </Route>
    </Switch>
  );
};

export default BaseRouter;
