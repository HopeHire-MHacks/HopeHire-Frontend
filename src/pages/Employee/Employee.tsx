import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { routes } from '@/constants/routes';

import { BriefcaseIcon, PlusCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import withMainPageLayout from '@/components/withMainPageLayout/withMainPageLayout';
import Listings from '@/components/Employee/Listings';

const EmptyComponent = () => <></>;

const navigation = [
  { name: 'Listings', href: routes.employee.base + routes.employee.listings, icon: PlusCircleIcon, current: true },
  { name: 'Applications', href: routes.employee.base + routes.employee.applications, icon: BriefcaseIcon, current: false },
  { name: 'Profile', href: routes.employee.base + routes.employee.profile, icon: UserCircleIcon, current: false },
];

const Employee: React.FC = () => {
  return (
    <div className='h-full w-full flex flex-row'>
      <Switch>
        <Route exact path={routes.employee.base + routes.employee.listings} component={Listings} />
        <Route exact path={routes.employee.base + routes.employee.applications} component={EmptyComponent} />
        <Route exact path={routes.employee.base + routes.employee.profile} component={EmptyComponent} />
        <Route exact path='*'>
          <Redirect to={routes.employee.base + routes.employee.listings} />
        </Route>
      </Switch>
    </div>
  );
};

export default withMainPageLayout(Employee, navigation);
