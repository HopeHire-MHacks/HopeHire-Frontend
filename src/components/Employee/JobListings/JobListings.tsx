import { JobData } from '@/api/Jobs/JobService';
import { routes } from '@/constants/routes';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CardListWithHeader from '../CardListWithHeader';
import ListingItem from '../ListingItem';

export const positions: JobData[] = [];

const Listings = () => {
  const history = useHistory();
  const onClick = () => {
    history.push(routes.employee.base + routes.employee.applications);
  };
  return (
    <CardListWithHeader
      header='Job Postings'
      description='Discover your next career opportunity with our extensive job listings.'
      buttonText='View Submitted Applications'
      buttonOnClick={onClick}
    >
      {positions.map(position => (
        <ListingItem key={position.id} position={position} />
      ))}
    </CardListWithHeader>
  );
};

export default Listings;
