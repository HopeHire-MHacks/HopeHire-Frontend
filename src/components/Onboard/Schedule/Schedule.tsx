import React, { useState, useEffect } from 'react';
import { employeeOnboardAtom } from '@/utils/atoms/forms/employeeOnboard';
import { toasterAtom, ToasterType } from '@/utils/atoms/toaster';
import { useRecoilState } from 'recoil';
import DateTime from '@/utils/DateTime';
import { useApi } from '@/api/ApiHandler';
import EmployeeService, { CreateEmployeeData } from '@/api/Employee/EmployeeService';

import Calendar, { EventData } from '@/components/Calendar';

const Schedule = () => {
  const [employeeOnboard, setEmployeeOnboard] = useRecoilState(employeeOnboardAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToaster] = useRecoilState(toasterAtom);
  const [availabilities, setAvailabilities] = useState<EventData[]>(employeeOnboard.availableTimesCalendar);
  const [createEmployee] = useApi((data: CreateEmployeeData) => EmployeeService.createEmployee(data), true, true, true);

  useEffect(() => {
    setEmployeeOnboard(prev => ({ ...prev, availableTimesCalendar: availabilities }));
    const availableDates = availabilities
      .map(event => [new Date(event.start), new Date(event.end)])
      .reduce((acc, curr) => [...acc, ...curr], []);
    const availableTimes = availableDates.map(date => new Date(date)).map(date => DateTime.newDateTimeFromDate(date).toString());
    setEmployeeOnboard(prev => ({ ...prev, availableTimes }));
  }, [availabilities]);

  const onSubmit = async () => {
    const data: CreateEmployeeData = {
      name: employeeOnboard.name,
      personalStatement: employeeOnboard.personalStatement,
      skills: employeeOnboard.skills,
      interests: employeeOnboard.interests,
      dateOfBirth: DateTime.newDateTimeFromDate(employeeOnboard.dateOfBirth).toString(),
      remarks: employeeOnboard.remarks,
      availableTimes: employeeOnboard.availableTimes,
      preferredLocation: employeeOnboard.preferredLocation,
      dialysisFrequency: employeeOnboard.dialysisFrequency,
      profilePhoto: employeeOnboard.profilePhoto,
      resume: employeeOnboard.resume,
    };

    if (employeeOnboard.availableTimes.length === 0) {
      setToaster({ isShown: true, type: ToasterType.ERROR, message: 'Please indicate your availability', title: 'Error' });
      return;
    }

    const res = await createEmployee(data);
    if (res) {
      console.log(res);
    }
  };

  return (
    <div>
      <Calendar availabilities={availabilities} setAvailabilities={setAvailabilities} />
      <div className='flex justify-end py-5 mr-5 xl:mr-0'>
        <button
          onClick={e => {
            e.preventDefault();
            onSubmit();
          }}
          type='submit'
          className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Schedule;
