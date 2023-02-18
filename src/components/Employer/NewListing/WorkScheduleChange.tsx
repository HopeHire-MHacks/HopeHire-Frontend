import React from 'react';

import { newListingAtom } from '@/utils/atoms/forms/newListing';
import { useRecoilState } from 'recoil';

const WorkScheduleChange = () => {
  const [newListingState, setNewListingState] = useRecoilState(newListingAtom);
  return (
    <fieldset className='col-span-6'>
      <legend className='contents text-base font-medium text-gray-900'>Work schedule can be changed if necessary</legend>
      <p className='text-sm text-gray-500'>
        Due to changing medical conditions and needs, the employee may require a change of work schedule.
      </p>
      <div className='mt-4 space-x-5 flex flex-row'>
        <div className='flex items-center'>
          <input
            id='change-schedule-yes'
            name='change-schedule'
            type='radio'
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
            checked={newListingState.changeSchedule}
            onChange={() => setNewListingState(prev => ({ ...prev, changeSchedule: true }))}
          />
          <label htmlFor='change-schedule-yes' className='ml-3 block text-sm font-medium text-gray-700'>
            Yes
          </label>
        </div>
        <div className='flex items-center'>
          <input
            id='change-schedule-no'
            name='change-schedule'
            type='radio'
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
            checked={!newListingState.changeSchedule}
            onChange={() => setNewListingState(prev => ({ ...prev, changeSchedule: false }))}
          />
          <label htmlFor='change-schedule-no' className='ml-3 block text-sm font-medium text-gray-700'>
            No
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default WorkScheduleChange;
