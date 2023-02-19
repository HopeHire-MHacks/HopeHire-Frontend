import { routes } from '@/constants/routes';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CardListWithHeader from '../CardListWithHeader';
import ListingItem from '../ListingItem';

export const positions = [
  {
    id: 1,
    positionName: 'Software Engineer',
    jobType: 'Full Time',
    industryType: 2,
    jobDescription:
      'We are looking for a software engineer to join our team. You will be responsible for developing and maintaining our software products.',
    jobRequirements:
      'You should have at least 5 years of experience in software development. You should have experience in developing web applications using React and Node.js.',
    jobFlexibility: 'Remote',
    latLong: [-33.8651, 151.2099],
    hasDialysisSupport: true,
    hasFlexibleSchedule: true,
    physicalDemands: 'Light',
    salaryType: 'Fixed  ',
    scheduledType: 'Part Time',
    openingTime: new Date('2021-01-01T00:00:00.000Z'),
    isOpen: true,
    skills: [1, 2, 3],
    salaryRange: [5000, 10000],
    country: 'Australia',
    city: 'Sydney',
    state: 'NSW',
    postalCode: '2000',
    address: '111 George St',
    employerId: 1,
  },
  {
    id: 2,
    positionName: 'Data Analyst',
    jobType: 'Full Time',
    industryType: 4,
    jobDescription:
      'We are looking for a data analyst to join our team. You will be responsible for analyzing and interpreting large data sets to support business decisions.',
    jobRequirements:
      'You should have at least 3 years of experience in data analysis. You should be proficient in SQL and have experience with data visualization tools such as Tableau or PowerBI.',
    jobFlexibility: 'Flexible Schedule',
    latLong: [51.5074, -0.1278],
    hasDialysisSupport: true,
    hasFlexibleSchedule: false,
    physicalDemands: 'Low',
    salaryType: 'Salary + Bonus',
    scheduledType: 'Full Time',
    openingTime: new Date('2022-06-01T00:00:00.000Z'),
    isOpen: true,
    skills: [1, 5, 3],
    salaryRange: [7000, 15000],
    country: 'UK',
    city: 'London',
    state: '',
    postalCode: 'WC1E 6BT',
    address: '789 Oxford St',
    employerId: 3,
  },
  {
    id: 3,
    positionName: 'DevOps Engineer',
    jobType: 'Contract',
    industryType: 5,
    jobDescription:
      'We are looking for a DevOps engineer to join our team. You will be responsible for automating and improving the software deployment process.',
    jobRequirements:
      'You should have at least 5 years of experience in DevOps. You should be proficient in scripting languages such as Python or Ruby and have experience with cloud infrastructure such as AWS or Google Cloud.',
    jobFlexibility: 'Remote',
    latLong: [43.6532, -79.3832],
    hasDialysisSupport: false,
    hasFlexibleSchedule: false,
    physicalDemands: 'Low',
    salaryType: 'Hourly',
    scheduledType: 'Part Time',
    openingTime: new Date('2022-10-01T00:00:00.000Z'),
    isOpen: false,
    skills: [8, 3],
    salaryRange: [50, 80],
    country: 'Canada',
    city: 'Toronto',
    state: 'ON',
    postalCode: 'M5V 2T6',
    address: '456 Bay St',
    employerId: 2,
  },
  {
    id: 4,
    positionName: 'Product Manager',
    jobType: 'Full Time',
    industryType: 8,
    jobDescription:
      'We are looking for a product manager to join our team. You will be responsible for defining and delivering our product roadmap.',
    jobRequirements:
      'You should have at least 5 years of experience in product management. You should have experience in Agile methodologies and have a proven track record of delivering successful products.',
    jobFlexibility: 'Flexible Schedule',
    latLong: [40.7128, -74.006],
    hasDialysisSupport: true,
    hasFlexibleSchedule: true,
    physicalDemands: 'Low',
    salaryType: 'Fixed ',
    scheduledType: 'Full Time',
    openingTime: new Date('2022-05-01T00:00:00.000Z'),
    isOpen: true,
    skills: [1, 2, 8],
    salaryRange: [9000, 15000],
    country: 'USA',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    address: '123 Main St',
    employerId: 3,
  },
];

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
