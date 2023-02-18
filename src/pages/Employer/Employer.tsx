import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SideBar from '@/components/SideBar';
import { routes } from '@/constants/routes';
import NewListing from '@/components/Employer/NewListing';

import { BriefcaseIcon, PlusCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const EmptyComponent = () => <></>;

const navigation = [
  { name: 'New Listing', href: routes.employer.base + routes.employer.newListing, icon: PlusCircleIcon, current: true },
  { name: 'Listings', href: routes.employer.base + routes.employer.listings, icon: BriefcaseIcon, current: false },
  { name: 'Profile', href: routes.employer.base + routes.employer.profile, icon: UserCircleIcon, current: false },
];

const Employer: React.FC = () => {
  return (
    <div className='h-screen flex flex-row'>
      <SideBar
        navigation={navigation}
        userName='Kristen Sappire'
        userProfileImg='https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
      />

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

export default Employer;
