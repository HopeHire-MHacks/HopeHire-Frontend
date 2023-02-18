import React from 'react';
import { routes } from '@/constants/routes';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from '@pages/Landing/Home';
import Login from '@pages/Landing/Login';
import Register from '@pages/Landing/SignUp';
import Onboard from '@pages/Onboard';

const BaseRouter = () => {
  return (
    <Switch>
      <Route exact path={routes.home} component={Home} />
      <Route exact path={routes.authentication.login} component={Login} />
      <Route exact path={routes.authentication.signup} component={Register} />
      <Route exact path={routes.onboard} component={Onboard} />
      <Route exact path='*'>
        <Redirect to={routes.home} />
      </Route>
    </Switch>
  );
};

export default BaseRouter;
