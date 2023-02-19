import React, { useEffect } from 'react';
import industryTypes from '@/constants/industryTypes';
import { useParams } from 'react-router-dom';
import EmployerDetails from '../Employer/EmployerDetails';
import Accordion from '../Accordion';

const job = {
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
  openingTime: '2022-05-01T00:00:00.000Z',
  isOpen: true,
  skills: [1, 2, 8],
  salaryRange: [9000, 15000],
  country: 'USA',
  city: 'New York',
  state: 'NY',
  postalCode: '10001',
  address: '123 Main St',
  employerId: 3,
  createdAt: '2023-02-18T12:45:07.961Z',
  updatedAt: '2023-02-18T12:45:07.961Z',
  employer: {
    id: 3,
    name: 'Quantum Trading LLC',
    userId: 6,
    companyDescription:
      'Quantum Trading LLC is a quantitative trading firm that uses cutting-edge technology and data analysis to make informed trading decisions.',
    logo: null,
    address: '789 Oxford St',
    numberOfEmployees: 80,
    latLong: [2.2833, 103.85],
    country: 'UK',
    city: 'London',
    state: 'Britain',
    postalCode: 'WC1E 6BT',
    webAddress: 'https://www.nike.com/',
    createdAt: '2023-02-18T12:45:07.950Z',
    updatedAt: '2023-02-18T12:45:07.950Z',
  },
};

const JobListing = () => {
  const { id } = useParams<{ id: string }>();

  console.log(id);
  useEffect(() => {
    // TODO: fetch job listing by id
  });
  return (
    <div>
      <div className=' flex flex-wrap items-center justify-between sm:flex-nowrap bg-gray-50 shadow sm:rounded-lg m-5 p-2'>
        <div className='ml-3'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <img
                className='h-12 w-12 rounded-full'
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt=''
              />
            </div>
            <div className='ml-4'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>{job.employer.name}</h3>
            </div>
          </div>
        </div>
      </div>
      <Accordion title='Job Information' description='Get the inside scoop on your next career move with our comprehensive job listing.'>
        <div className='border-t border-gray-200'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Position name</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.positionName}</dd>
            </div>

            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Job Description</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.jobDescription}</dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Job Requirements</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.jobRequirements}</dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Industry Type</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{industryTypes[job.industryType]}</dd>
            </div>

            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Job Flexibility</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.jobFlexibility}</dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Peritonial Dialysis Support</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.hasDialysisSupport ? 'Available' : 'Not Available'}</dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Location</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>
                {job.address + ', ' + job.city + ', ' + job.state + ', ' + job.country + ', ' + job.postalCode}
              </dd>
            </div>

            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Part Time / Full Time</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.scheduledType}</dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Salary Type</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.salaryType}</dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Salary Range</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{'$' + job.salaryRange[0] + ' - $' + job.salaryRange[1]}</dd>
            </div>

            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Physical Demand</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.physicalDemands}</dd>
            </div>
          </dl>
        </div>
      </Accordion>
      <EmployerDetails employer={job.employer} />
    </div>
  );
};

export default JobListing;
