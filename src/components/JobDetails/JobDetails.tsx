import industryTypes from '@/constants/industryTypes';
import React from 'react';
import Accordion from '../Accordion';
import { Job } from '../Employee/ListingItem/ListingItem';

interface Props {
  job: Job;
}

const JobDetails = ({ job }: Props) => {
  return (
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
  );
};

export default JobDetails;
