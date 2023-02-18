import React, { useEffect, useState } from 'react';

import { newListingAtom } from '@/utils/atoms/forms/newListing';
import { useRecoilState } from 'recoil';
import Calendar, { EventData } from '@/components/Calendar';
import DateTime from '@/utils/DateTime';
import AutoFillAddress from '@/components/Onboard/YourInformation/AutoFillAddress';
import JobService, { CreateJobData, SalaryTypes } from '@/api/Jobs/JobService';
import { useApi } from '@/api/ApiHandler';
import { useHistory } from 'react-router';

import ListingBasicDetails from './ListingBasicDetails';
import PeritonealDiaylsis from './PeritonealDialysis';
import WorkScheduleChange from './WorkScheduleChange';
import PhysicalDemands from './PhysicalDemands';
import SalaryExpections from './SalayExpectations';
import ListingTime from './ListingTime';
import { SOFT_SKILLS } from '@/constants/seedData';
import Badge from '@/components/Onboard/YourInformation/Badge';
import { ToasterType, toasterAtom } from '@/utils/atoms/toaster';
import { routes } from '@/constants/routes';

const isSalaryEmptyError = (salary: number[], salaryType: SalaryTypes) => {
  if (salaryType === 'fixed') {
    return salary.length !== 1;
  } else if (salaryType === 'ranged') {
    return salary.length !== 2;
  }
  return salary.length !== 0;
};

const NewListing = () => {
  const [newListingState, setNewListingState] = useRecoilState(newListingAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToaster] = useRecoilState(toasterAtom);
  const [workScheduleCalendar, setWorkScheduleCalendar] = useState<EventData[]>(newListingState.workScheduleCalendar);
  const [createJob] = useApi((data: CreateJobData) => JobService.createJob(data), true, true, true);
  const history = useHistory();

  const isValidForm = () => {
    const {
      address,
      availableTimes,
      city,
      country,
      jobDescription,
      jobFlexibility,
      jobRequirements,
      openingTime,
      physicalDemands,
      positionName,
      postalCode,
      salaryRange,
      salaryType,
      skills,
      state,
    } = newListingState;

    if (
      address.length === 0 ||
      city.length === 0 ||
      country.length === 0 ||
      jobDescription.length === 0 ||
      jobRequirements.length === 0 ||
      openingTime.length === 0 ||
      positionName.length === 0 ||
      postalCode.length === 0 ||
      skills.length === 0 ||
      state.length === 0 ||
      isSalaryEmptyError(salaryRange, salaryType) ||
      availableTimes.length === 0 ||
      physicalDemands.length === 0 ||
      jobFlexibility.length === 0
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setNewListingState(prev => ({ ...prev, workScheduleCalendar }));
    const schedule = workScheduleCalendar
      .map(event => [new Date(event.start), new Date(event.end)])
      .reduce((acc, curr) => [...acc, ...curr], []);
    const availableTimes = schedule.map(date => new Date(date)).map(date => DateTime.newDateTimeFromDate(date).toString());
    setNewListingState(prev => ({ ...prev, availableTimes }));
  }, [workScheduleCalendar]);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!isValidForm()) {
      setToaster({ type: ToasterType.ERROR, title: 'Error', message: 'Please fill out all required fields', isShown: true });
      return;
    }

    const res = await createJob(newListingState);
    if (res && res.data) {
      console.log(res.data);
      history.push(routes.employer.listing);
    }
  };

  const handleSoftSkillClick = (id: number) => {
    if (newListingState.skills.includes(id)) {
      setNewListingState(prev => ({ ...prev, skills: prev.skills.filter(i => i !== id) }));
    } else {
      setNewListingState(prev => ({ ...prev, skills: [...prev.skills, id] }));
    }
  };

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

              <div className='col-span-6'>
                <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>Preferred Skills</h2>
              </div>
              <div className='col-span-6'>
                <div className='flex flex-wrap gap-2'>
                  {SOFT_SKILLS.map(skill => {
                    return (
                      <Badge
                        defaultState={newListingState.skills.includes(skill.id)}
                        onClick={handleSoftSkillClick}
                        text={skill.name}
                        value={skill.id}
                        key={skill.id}
                      />
                    );
                  })}
                </div>
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
              onClick={e => onSubmit(e)}
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
