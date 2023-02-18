import React from 'react';
import industryTypes from '@/constants/industryTypes';
import jobTypes from '@/constants/jobTypes';

import { newListingAtom } from '@/utils/atoms/toaster/atom';
import { useRecoilState } from 'recoil';

const ListingBasicDetails = () => {
  const [newListingState, setNewListingState] = useRecoilState(newListingAtom);

  return (
    <>
      <div className='col-span-6 sm:col-span-6'>
        <label htmlFor='position-name' className='block text-sm font-medium text-gray-700'>
          Position Name
        </label>
        <input
          type='text'
          name='position-name'
          id='position-name'
          autoComplete='position-name'
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          onChange={e => setNewListingState(prev => ({ ...prev, name: e.target.value }))}
          value={newListingState.name}
        />
      </div>

      <div className='col-span-6 sm:col-span-2'>
        <label htmlFor='job-type' className='block text-sm font-medium text-gray-700'>
          Job Type
        </label>
        <select
          id='job-type'
          name='job-type'
          autoComplete='job-type'
          className='mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
          onChange={e => setNewListingState(prev => ({ ...prev, jobType: e.target.value }))}
          value={newListingState.jobType}
        >
          {jobTypes.map(jobType => (
            <option key={jobType}>{jobType}</option>
          ))}
        </select>
      </div>

      <div className='col-span-6 sm:col-span-4'>
        <label htmlFor='industry-type' className='block text-sm font-medium text-gray-700'>
          Industry Type
        </label>
        <select
          id='industry-type'
          name='industry-type'
          autoComplete='industry-type'
          className='mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
          onChange={e => setNewListingState(prev => ({ ...prev, industryType: e.target.value }))}
          value={newListingState.industryType}
        >
          {industryTypes.map(industryType => (
            <option key={industryType}>{industryType}</option>
          ))}
        </select>
      </div>

      <div className='col-span-6 sm:col-span-6'>
        <label htmlFor='job-description' className='block text-sm font-medium text-gray-700'>
          Job Description
        </label>
        <div className='mt-1'>
          <textarea
            id='job-description'
            name='job-description'
            rows={3}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            onChange={e => setNewListingState(prev => ({ ...prev, description: e.target.value }))}
            value={newListingState.description}
          />
        </div>
      </div>

      <div className='col-span-6 sm:col-span-6'>
        <label htmlFor='job-requirements' className='block text-sm font-medium text-gray-700'>
          Job Requirements
        </label>
        <div className='mt-1'>
          <textarea
            id='job-requirements'
            name='job-requirements'
            rows={3}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            onChange={e => setNewListingState(prev => ({ ...prev, requirements: e.target.value }))}
            value={newListingState.requirements}
          />
        </div>
      </div>

      <div className='col-span-6 sm:col-span-6'>
        <label htmlFor='job-flexibility' className='block text-sm font-medium text-gray-700'>
          Job Flexibility
        </label>
        <div className='mt-1'>
          <textarea
            id='job-flexibility'
            name='job-flexibility'
            rows={3}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            onChange={e => setNewListingState(prev => ({ ...prev, flexiblity: e.target.value }))}
            value={newListingState.flexiblity}
          />
        </div>
      </div>
    </>
  );
};

export default ListingBasicDetails;
