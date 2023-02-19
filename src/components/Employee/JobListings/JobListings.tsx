import JobService, { JobData } from '@/api/Jobs/JobService';
import { routes } from '@/constants/routes';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardListWithHeader from '../CardListWithHeader';
import ListingItem from '../ListingItem';

export const positions: JobData[] = [];

const Listings = () => {
  const history = useHistory();
  const [listings, setListings] = useState<JobData[]>([]);

  const onClick = () => {
    history.push(routes.employee.base + routes.employee.applications);
  };

  const getJobs = async () => {
    const jobs = (await JobService.getOpenJobs()).data;
    setListings(jobs);
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <CardListWithHeader
      header='Job Postings'
      description='Discover your next career opportunity with our extensive job listings.'
      buttonText='View Submitted Applications'
      buttonOnClick={onClick}
    >
      {listings.map(listing => (
        <ListingItem key={listing.id} position={listing} />
      ))}
    </CardListWithHeader>
  );
};

export default Listings;
