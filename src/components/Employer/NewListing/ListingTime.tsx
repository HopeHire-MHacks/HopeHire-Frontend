import React, { useState } from 'react';
import DatePicker, { DayValue } from '@amir04lm26/react-modern-calendar-date-picker';

import { newListingAtom } from '@/utils/atoms/toaster/atom';
import { useRecoilState } from 'recoil';

const PhysicalDemands = () => {
  const [newListingState, setNewListingState] = useRecoilState(newListingAtom);
  const [openDatePicker, setOpenDatePicker] = useState<DayValue>(null);

  return (
    <fieldset className='col-span-6'>
      <legend className='contents text-base font-medium text-gray-900'>Support for peritoneal dialysis</legend>
      <p className='text-sm text-gray-500'>
        As some kidney patients require to undergo peritoneal dialysis, a clean, private area is needed at the workplace for the employee to
        perform the procedure if necessary.
      </p>
      <div className='mt-4 space-x-5 flex flex-row'>
        <div className='flex items-center'>
          <input
            id='open-immediately-yes'
            name='open-immediately'
            type='radio'
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
            checked={newListingState.openImmediately}
            onChange={() =>
              setNewListingState({
                ...newListingState,
                openImmediately: true,
              })
            }
          />
          <label htmlFor='dialysis-support-no' className='ml-3 block text-sm font-medium text-gray-700'>
            Open Immediately
          </label>
        </div>
        <div className='flex items-center'>
          <input
            id='open-immediately-no'
            name='open-immediately'
            type='radio'
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
            checked={!newListingState.openImmediately}
            onChange={() =>
              setNewListingState({
                ...newListingState,
                openImmediately: false,
              })
            }
          />
          <label htmlFor='dialysis-support-yes' className='ml-3 block text-sm font-medium text-gray-700'>
            Open At
          </label>
        </div>
        {!newListingState.openImmediately && (
          <div className='col-span-2'>
            <DatePicker
              value={openDatePicker}
              onChange={setOpenDatePicker}
              inputPlaceholder='Select a date'
              inputClassName='h-10 border-gray-300 rounded-md shadow-sm font-bold focus:ring-indigo-500'
              shouldHighlightWeekends
            />
          </div>
        )}
      </div>
    </fieldset>
  );
};

export default PhysicalDemands;
