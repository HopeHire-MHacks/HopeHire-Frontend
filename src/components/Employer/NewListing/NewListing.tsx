import React, { useEffect, useState } from 'react';

import { newListingAtom } from '@/utils/atoms/toaster/atom';
import { useRecoilState } from 'recoil';
import Calendar, { EventData } from '@/components/Calendar';
import DateTime from '@/utils/DateTime';
import AutoFillAddress from '@/components/Onboard/YourInformation/AutoFillAddress';

import ListingBasicDetails from './ListingBasicDetails';
import PeritonealDiaylsis from './PeritonealDialysis';
import WorkScheduleChange from './WorkScheduleChange';
import PhysicalDemands from './PhysicalDemands';
import SalaryExpections from './SalayExpectations';
import ListingTime from './ListingTime';

const NewListing = () => {
  const [newListingState, setNewListingState] = useRecoilState(newListingAtom);
  const [workScheduleCalendar, setWorkScheduleCalendar] = useState<EventData[]>(newListingState.workScheduleCalendar);

  useEffect(() => {
    setNewListingState(prev => ({ ...prev, workScheduleCalendar }));
    const schedule = workScheduleCalendar
      .map(event => [new Date(event.start), new Date(event.end)])
      .reduce((acc, curr) => [...acc, ...curr], []);
    const workSchedule = schedule.map(date => new Date(date)).map(date => DateTime.newDateTimeFromDate(date).toString());
    setNewListingState(prev => ({ ...prev, workSchedule }));
  }, [workScheduleCalendar]);

  return (
    <div className='m-5'>
      <h2 className='text-3xl font-bold leading-10 tracking-tight text-gray-900'>Create a New Listing</h2>
      <form className='mt-5' action='#' method='POST'>
        <div className='overflow-hidden shadow sm:rounded-md'>
          <div className='bg-white px-4 py-5 sm:p-6'>
            <div className='grid grid-cols-6 gap-6'>
              {/* Basic Listing Details */}
              <ListingBasicDetails />

              {/* Location Details */}
              <div className='col-span-6 sm:col-span-6'>
                <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>Location Details</h2>
              </div>
              <AutoFillAddress
                address={newListingState.address}
                state={newListingState.state}
                country={newListingState.country}
                city={newListingState.city}
                postalCode={newListingState.postalCode}
                onSetAddress={address => setNewListingState(prev => ({ ...prev, address }))}
                onSetState={state => setNewListingState(prev => ({ ...prev, state }))}
                onSetCountry={country => setNewListingState(prev => ({ ...prev, country }))}
                onSetCity={city => setNewListingState(prev => ({ ...prev, city }))}
                onSetPostalCode={postalCode => setNewListingState(prev => ({ ...prev, postalCode }))}
              />

              {/* Working Hours */}
              <div className='col-span-6'>
                <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>Working Hours</h2>
                <Calendar availabilities={workScheduleCalendar} setAvailabilities={setWorkScheduleCalendar} periodTitle='Work' />
              </div>

              {/* Additional Details */}
              <div className='col-span-6'>
                <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>Additional Details</h2>
              </div>

              <PeritonealDiaylsis />

              <WorkScheduleChange />

              <PhysicalDemands />

              <div className='col-span-6'>
                <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>Salary</h2>
              </div>

              <SalaryExpections />

              <div className='col-span-6'>
                <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>Listing Time</h2>
              </div>

              <ListingTime />
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
            <button
              type='submit'
              className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewListing;
