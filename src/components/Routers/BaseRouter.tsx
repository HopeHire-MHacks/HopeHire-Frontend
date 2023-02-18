import React, { useEffect } from 'react';
import { routes } from '@/constants/routes';
import { Redirect, Route, Switch } from 'react-router-dom';
import ApiService from '@/api/ApiService';
import { getLocalStorageValue, setLocalStorageValue } from '@/utils/miscellaneous';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/utils/atoms/user';
import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/User/UserService';
import serialize from 'serialize-javascript';

import Home from '@pages/Landing/Home';
import Login from '@pages/Landing/Login';
import Register from '@pages/Landing/SignUp';
import Onboard from '@pages/Onboard';

function isTokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}

const BaseRouter = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUser] = useRecoilState(userAtom);
  const [getSelf] = useApi(() => UserService.getSelf(), false, false, false);

  const token = getLocalStorageValue(ApiService.authTokenKey);
  const isLoggedIn = token && !isTokenExpired(token);
  let isOnboarded = false;

  const getUser = async () => {
    const res = await getSelf();
    if (res && res.data) {
      const serialized = serialize(res.data);
      setLocalStorageValue('user', JSON.stringify(serialized));
    }
    const serializedUser = getLocalStorageValue('user');
    const userFromStorage = JSON.parse(eval('(' + serializedUser + ')'));
    setUser(prev => ({ ...prev, ...userFromStorage }));
    isOnboarded = userFromStorage.employee !== null || userFromStorage.employer !== null;
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!isLoggedIn) {
    setLocalStorageValue(ApiService.authTokenKey, '');
  }

  return (
    <Switch>
      <Route exact path={routes.home} component={Home} />
      <Route exact path={routes.authentication.login} component={Login} />
      <Route exact path={routes.authentication.signup} component={Register} />
      {isLoggedIn && !isOnboarded && <Route exact path={routes.onboard} component={Onboard} />}
      <Route exact path='*'>
        <Redirect to={isLoggedIn ? routes.onboard : routes.home} />
      </Route>
    </Switch>
  );
};

export default BaseRouter;
