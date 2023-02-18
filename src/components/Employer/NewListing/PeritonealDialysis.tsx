import React from 'react';

import { useRecoilState } from 'recoil';
import { newListingAtom } from '@/utils/atoms/toaster/atom';

const PeritonealDiaylsis = () => {
  const [newListingState, setNewListingState] = useRecoilState(newListingAtom);
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
            id='dialysis-support-yes'
            name='dialysis-support'
            type='radio'
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
            checked={newListingState.dialysisSupport}
            onChange={() => setNewListingState(prev => ({ ...prev, dialysisSupport: true }))}
          />
          <label htmlFor='dialysis-support-yes' className='ml-3 block text-sm font-medium text-gray-700'>
            Yes
          </label>
        </div>
        <div className='flex items-center'>
          <input
            id='dialysis-support-no'
            name='dialysis-support'
            type='radio'
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
            checked={!newListingState.dialysisSupport}
            onChange={() => setNewListingState({ ...newListingState, dialysisSupport: false })}
          />
          <label htmlFor='dialysis-support-no' className='ml-3 block text-sm font-medium text-gray-700'>
            No
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default PeritonealDiaylsis;
