import React from 'react';

import { newListingAtom } from '@/utils/atoms/toaster/atom';
import { useRecoilState } from 'recoil';

const PhysicalDemands = () => {
  const [newListingState, setNewListingState] = useRecoilState(newListingAtom);
  return (
    <fieldset className='col-span-6'>
      <legend className='contents text-base font-medium text-gray-900'>Physical Demands</legend>
      <div className='mt-4 space-x-5 flex flex-row'>
        <div className='flex items-center'>
          <input
            id='minimal'
            name='physical-demands'
            type='radio'
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
            checked={newListingState.physicalDemands == 'Minimal'}
            onChange={() => setNewListingState({ ...newListingState, physicalDemands: 'Minimal' })}
          />
          <label htmlFor='minimal' className='ml-3 block text-sm font-medium text-gray-700'>
            Minimal
          </label>
        </div>
        <div className='flex items-center'>
          <input
            id='light'
            name='physical-demands'
            type='radio'
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
            checked={newListingState.physicalDemands == 'Light'}
            onChange={() => setNewListingState({ ...newListingState, physicalDemands: 'Light' })}
          />
          <label htmlFor='light' className='ml-3 block text-sm font-medium text-gray-700'>
            Light
          </label>
        </div>
        <div className='flex items-center'>
          <input
            id='moderate'
            name='physical-demands'
            type='radio'
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
            checked={newListingState.physicalDemands == 'Moderate'}
            onChange={() => setNewListingState({ ...newListingState, physicalDemands: 'Moderate' })}
          />
          <label htmlFor='moderate' className='ml-3 block text-sm font-medium text-gray-700'>
            Moderate
          </label>
        </div>
        <div className='flex items-center'>
          <input
            id='heavy'
            name='physical-demands'
            type='radio'
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
            checked={newListingState.physicalDemands == 'Heavy'}
            onChange={() => setNewListingState({ ...newListingState, physicalDemands: 'Heavy' })}
          />
          <label htmlFor='heavy' className='ml-3 block text-sm font-medium text-gray-700'>
            Heavy
          </label>
        </div>
        <div className='flex items-center'>
          <input
            id='very-heavy'
            name='physical-demands'
            type='radio'
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
            checked={newListingState.physicalDemands == 'Very Heavy'}
            onChange={() => setNewListingState({ ...newListingState, physicalDemands: 'Very Heavy' })}
          />
          <label htmlFor='very-heavy' className='ml-3 block text-sm font-medium text-gray-700'>
            Very Heavy
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default PhysicalDemands;
