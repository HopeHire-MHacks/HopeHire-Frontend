import React, { useEffect, useState } from 'react';
import { routes } from '@/constants/routes';
import { Redirect, Route, Switch } from 'react-router-dom';
import ApiService from '@/api/ApiService';
import { getLocalStorageValue } from '@/utils/miscellaneous';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/utils/atoms/user';
import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/User/UserService';

import Employer from '@/pages/Employer';
import Home from '@pages/Landing/Home';
import Login from '@pages/Landing/Login';
import Register from '@pages/Landing/SignUp';
import Onboard from '@pages/Onboard';

function isTokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}

const BaseRouter = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const token = getLocalStorageValue(ApiService.authTokenKey);

  const [isLoggedIn] = useState<boolean>((token && !isTokenExpired(token)) || false);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [getSelf] = useApi(() => UserService.getSelf(), false, false, false);

  const getUser = async () => {
    const res = await getSelf();
    if (res && res.data) {
      setUser(prev => ({ ...prev, ...res.data }));
    }
    setIsOnboarded(user.employee !== null || user.employer !== null);
  };

  useEffect(() => {
    getUser();
  }, []);

  const defaultRoute = () => {
    if (isLoggedIn && !isOnboarded) {
      return routes.onboard;
    } else if (user?.employer !== null) {
      return routes.employer.base;
    } else if (user?.employee !== null) {
      return routes.employee.base;
    }
    return routes.home;
  };

  return (
    <Switch>
      <Route exact path={routes.home} component={Home} />

      {/* You should only see login signup pages if you are not logged in */}
      {!isLoggedIn && <Route exact path={routes.authentication.login} component={Login} />}
      {!isLoggedIn && <Route exact path={routes.authentication.signup} component={Register} />}

      {isLoggedIn && !isOnboarded && <Route exact path={routes.onboard} component={Onboard} />}
      {isLoggedIn && user?.employer !== null && <Route path={routes.employer.base} component={Employer} />}
      <Route exact path='*'>
        <Redirect to={defaultRoute()} />
      </Route>
    </Switch>
  );
};

export default BaseRouter;
