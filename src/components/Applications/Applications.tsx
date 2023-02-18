import React from 'react';
import CardListWithHeader from '../Employee/CardListWithHeader';
import { positions } from '../Employee/JobListings/JobListings';
import ListingItem from '../Employee/ListingItem';

const applications = [
  {
    id: 1,
    employeeId: 1,
    jobId: 1,
    remarks: 'I am interested in this job',
    status: 'Pending',
    createdAt: '2023-02-18T12:45:07.986Z',
    updatedAt: '2023-02-18T12:45:07.986Z',
  },
];

const Applications = () => {
  return (
    <CardListWithHeader
      header='Sent Applications'
      description='Stay organized and on top of your job search with our all-in-one application tracking page.'
      buttonText='Find more Jobs'
    >
      {positions.map(position => (
        <ListingItem key={position.id} position={position} application={applications[0]} />
      ))}
    </CardListWithHeader>
  );
};

export default Applications;
