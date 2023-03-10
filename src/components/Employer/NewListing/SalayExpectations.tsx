import React, { useEffect } from 'react';

import { newListingAtom } from '@/utils/atoms/forms/newListing';
import { useRecoilState } from 'recoil';

const SalaryExpections = () => {
  const [newListingState, setNewListingState] = useRecoilState(newListingAtom);

  useEffect(() => {
    const { minSalary, maxSalary } = newListingState;
    let salaryRange: number[] = [];
    if (minSalary && maxSalary) {
      salaryRange = [minSalary, maxSalary];
    } else if (minSalary) {
      salaryRange = [minSalary];
    }
    setNewListingState(prev => ({ ...prev, salaryRange }));
  }, [newListingState.minSalary, newListingState.maxSalary]);

  return (
    <>
      <fieldset className='col-span-6'>
        <div className='space-x-5 flex flex-row'>
          <div className='flex items-center'>
            <input
              id='fixed'
              name='salary'
              type='radio'
              className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
              checked={newListingState.salaryType == 'fixed'}
              onChange={() => {
                setNewListingState(prev => ({ ...prev, maxSalary: null, salaryType: 'fixed' }));
              }}
            />
            <label htmlFor='fixed' className='ml-3 block text-sm font-medium text-gray-700'>
              Fixed
            </label>
          </div>
          <div className='flex items-center'>
            <input
              id='ranged'
              name='salary'
              type='radio'
              className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
              checked={newListingState.salaryType == 'ranged'}
              onChange={() => setNewListingState(prev => ({ ...prev, salaryType: 'ranged' }))}
            />
            <label htmlFor='ranged' className='ml-3 block text-sm font-medium text-gray-700'>
              Ranged
            </label>
          </div>
          <div className='flex items-center'>
            <input
              id='none-yet'
              name='salary'
              type='radio'
              className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
              checked={newListingState.salaryType == 'none-yet'}
              onChange={() => {
                setNewListingState(prev => ({ ...prev, minSalary: null, maxSalary: null, salaryType: 'none-yet' }));
              }}
            />
            <label htmlFor='none-yet' className='ml-3 block text-sm font-medium text-gray-700'>
              None Yet
            </label>
          </div>
        </div>
      </fieldset>

      {newListingState.salaryType != 'none-yet' && (
        <div className='col-span-6 flex flex-row'>
          <div className='col-span-1'>
            <div className='mt-1 flex rounded-md shadow-sm'>
              <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm'>
                SGD
              </span>
              <input
                type='number'
                name='min-salary'
                id='min-salary'
                autoComplete='min-salary'
                className='block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                onChange={e => setNewListingState(prev => ({ ...prev, minSalary: parseInt(e.target.value) }))}
                value={newListingState.minSalary ? newListingState.minSalary : ''}
              />
            </div>
          </div>
          {newListingState.salaryType != 'fixed' && <p className='ml-3 mr-3 m-auto block text-sm font-medium text-gray-700'>-</p>}
          {newListingState.salaryType != 'fixed' && (
            <div className='col-span-1'>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm'>
                  SGD
                </span>
                <input
                  type='number'
                  name='max-salary'
                  id='max-salary'
                  autoComplete='max-salary'
                  className='block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  onChange={e => setNewListingState(prev => ({ ...prev, maxSalary: parseInt(e.target.value) }))}
                  value={newListingState.maxSalary ? newListingState.maxSalary : ''}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SalaryExpections;
