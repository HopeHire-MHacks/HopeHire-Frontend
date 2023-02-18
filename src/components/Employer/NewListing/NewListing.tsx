import React, { useEffect, useState } from 'react';
import DatePicker, { DayValue } from '@amir04lm26/react-modern-calendar-date-picker';

import { newListingAtom } from '@/utils/atoms/toaster/atom';
import { useRecoilState } from 'recoil';
import industryTypes from '@/constants/industryTypes';
import jobTypes from '@/constants/jobTypes';
import Calendar, { EventData } from '@/components/Calendar';
import DateTime from '@/utils/DateTime';
import AutoFillAddress from '@/components/Onboard/YourInformation/AutoFillAddress';

const NewListing = () => {
  const [newListingState, setNewListingState] = useRecoilState(newListingAtom);
  const [salaryState, setSalaryState] = useState(0);
  const [workScheduleCalendar, setWorkScheduleCalendar] = useState<EventData[]>(newListingState.workScheduleCalendar);
  const [openDatePicker, setOpenDatePicker] = useState<DayValue>(null);

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
                  onChange={e => setNewListingState({ ...newListingState, name: e.target.value })}
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
                  onChange={e => setNewListingState({ ...newListingState, jobType: e.target.value })}
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
                  onChange={e => setNewListingState({ ...newListingState, industryType: e.target.value })}
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
                    onChange={e => setNewListingState({ ...newListingState, description: e.target.value })}
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
                    onChange={e => setNewListingState({ ...newListingState, requirements: e.target.value })}
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
                    onChange={e => setNewListingState({ ...newListingState, flexiblity: e.target.value })}
                    value={newListingState.flexiblity}
                  />
                </div>
              </div>

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

              <div className='col-span-6'>
                <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>Working Hours</h2>
                <Calendar availabilities={workScheduleCalendar} setAvailabilities={setWorkScheduleCalendar} periodTitle='Work' />
              </div>

              <fieldset className='col-span-6'>
                <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>Additional Details</h2>
                <legend className='contents text-base font-medium text-gray-900'>Support for peritoneal dialysis</legend>
                <p className='text-sm text-gray-500'>
                  As some kidney patients require to undergo peritoneal dialysis, a clean, private area is needed at the workplace for the
                  employee to perform the procedure if necessary.
                </p>
                <div className='mt-4 space-x-5 flex flex-row'>
                  <div className='flex items-center'>
                    <input
                      id='dialysis-support-yes'
                      name='dialysis-support'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                      checked={newListingState.dialysisSupport}
                      onChange={() => setNewListingState({ ...newListingState, dialysisSupport: true })}
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
                      onChange={() => setNewListingState({ ...newListingState, changeSchedule: true })}
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
                      onChange={() => setNewListingState({ ...newListingState, changeSchedule: false })}
                    />
                    <label htmlFor='change-schedule-no' className='ml-3 block text-sm font-medium text-gray-700'>
                      No
                    </label>
                  </div>
                </div>
              </fieldset>

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

              <div className='col-span-6'>
                <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>Salary</h2>
              </div>

              <fieldset className='col-span-6'>
                <div className='space-x-5 flex flex-row'>
                  <div className='flex items-center'>
                    <input
                      id='fixed'
                      name='salary'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                      checked={salaryState == 0}
                      onChange={() => {
                        setSalaryState(0);
                        setNewListingState({ ...newListingState, maxSalary: null });
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
                      checked={salaryState == 1}
                      onChange={() => setSalaryState(1)}
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
                      checked={salaryState == 2}
                      onChange={() => {
                        setSalaryState(2);
                        setNewListingState({ ...newListingState, minSalary: null, maxSalary: null });
                      }}
                    />
                    <label htmlFor='none-yet' className='ml-3 block text-sm font-medium text-gray-700'>
                      None Yet
                    </label>
                  </div>
                </div>
              </fieldset>

              {salaryState != 2 && (
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
                        onChange={e => setNewListingState({ ...newListingState, minSalary: parseInt(e.target.value) })}
                        value={newListingState.minSalary ? newListingState.minSalary : ''}
                      />
                    </div>
                  </div>
                  {salaryState != 0 && <p className='ml-3 mr-3 m-auto block text-sm font-medium text-gray-700'>-</p>}
                  {salaryState != 0 && (
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
                          onChange={e => setNewListingState({ ...newListingState, maxSalary: parseInt(e.target.value) })}
                          value={newListingState.maxSalary ? newListingState.maxSalary : ''}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className='col-span-6'>
                <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>Listing Time</h2>
              </div>

              <fieldset className='col-span-6'>
                <legend className='contents text-base font-medium text-gray-900'>Support for peritoneal dialysis</legend>
                <p className='text-sm text-gray-500'>
                  As some kidney patients require to undergo peritoneal dialysis, a clean, private area is needed at the workplace for the
                  employee to perform the procedure if necessary.
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
