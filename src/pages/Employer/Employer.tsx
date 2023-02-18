import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { routes } from '@/constants/routes';
import NewListing from '@/components/Employer/NewListing';

import { BriefcaseIcon, PlusCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import withMainPageLayout from '@/components/withMainPageLayout/withMainPageLayout';

const EmptyComponent = () => <></>;

const navigation = [
  { name: 'New Listing', href: routes.employer.base + routes.employer.newListing, icon: PlusCircleIcon, current: true },
  { name: 'Listings', href: routes.employer.base + routes.employer.listings, icon: BriefcaseIcon, current: false },
  { name: 'Profile', href: routes.employer.base + routes.employer.profile, icon: UserCircleIcon, current: false },
];

const Employer: React.FC = () => {
  return (
    <div className='h-full w-full flex flex-row'>
      <Switch>
        <Route exact path={routes.employer.base + routes.employer.newListing} component={NewListing} />
        <Route exact path={routes.employer.base + routes.employer.listings} component={EmptyComponent} />
        <Route exact path={routes.employer.base + routes.employer.profile} component={EmptyComponent} />
        <Route exact path='*'>
          <Redirect to={routes.employer.base + routes.employer.newListing} />
        </Route>
      </Switch>
    </div>
  );
};

export default withMainPageLayout(Employer, navigation);
