import React, { useState, useEffect } from 'react';
import { employeeOnboardAtom } from '@/utils/atoms/forms/employeeOnboard';
import { toasterAtom, ToasterType } from '@/utils/atoms/toaster';
import { userAtom } from '@/utils/atoms/user';
import { useRecoilState } from 'recoil';
import DateTime from '@/utils/DateTime';
import { useApi } from '@/api/ApiHandler';
import EmployeeService, { CreateEmployeeData } from '@/api/Employee/EmployeeService';

import Calendar, { EventData } from '@/components/Calendar';
import UserService from '@/api/User/UserService';

const Schedule = () => {
  const [employeeOnboard, setEmployeeOnboard] = useRecoilState(employeeOnboardAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUser] = useRecoilState(userAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [__, setToaster] = useRecoilState(toasterAtom);
  const [availabilities, setAvailabilities] = useState<EventData[]>(employeeOnboard.availableTimesCalendar);
  const [createEmployee] = useApi((data: CreateEmployeeData) => EmployeeService.createEmployee(data), true, true, true);
  const [getSelf] = useApi(() => UserService.getSelf(), false, false, false);

  useEffect(() => {
    setEmployeeOnboard(prev => ({ ...prev, availableTimesCalendar: availabilities }));
    const availableDates = availabilities
      .map(event => [new Date(event.start), new Date(event.end)])
      .reduce((acc, curr) => [...acc, ...curr], []);
    const availableTimes = availableDates.map(date => new Date(date)).map(date => DateTime.newDateTimeFromDate(date).toString());
    setEmployeeOnboard(prev => ({ ...prev, availableTimes }));
  }, [availabilities]);

  const onSubmit = async () => {
    if (employeeOnboard.availableTimes.length === 0) {
      setToaster({ isShown: true, type: ToasterType.ERROR, message: 'Please indicate your availability', title: 'Error' });
      return;
    }

    const res = await createEmployee(employeeOnboard);
    if (res && res.data) {
      const user = await getSelf();
      if (user && user.data) {
        setUser(prev => ({ ...prev, ...user.data }));
      }
      window.setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div>
      <Calendar availabilities={availabilities} setAvailabilities={setAvailabilities} periodTitle='Available' />
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
