import { BriefcaseIcon, CalendarIcon, CurrencyDollarIcon, HeartIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/20/solid';

import React, { useEffect, useState } from 'react';
import { routes } from '@/constants/routes';
import { useApi } from '@/api/ApiHandler';
import JobService, { JobData } from '@/api/Jobs/JobService';
import { userAtom } from '@/utils/atoms/user';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Listings = () => {
  const [user] = useRecoilState(userAtom);
  const [positions, setPositions] = useState<JobData[]>([]);
  const employerId = user.employer?.id ?? 0;
  const [getMyListings] = useApi(() => JobService.getJobByEmployerId(employerId), true, true, true);
  const history = useHistory();

  const onClick = (jobId: number) => {
    console.log('here');
    history.push(routes.employer.base + routes.employer.listings + '/' + jobId);
  };

  const getListings = async () => {
    const res = await getMyListings();
    if (res && res.data) {
      console.log(res.data);
      setPositions(res.data);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <div className='m-5 w-full'>
      <h2 className='text-3xl font-bold leading-10 tracking-tight text-gray-900'>Your Listings</h2>
      <div className='mt-5 overflow-hidden bg-white shadow sm:rounded-md w-full'>
        <ul role='list' className='divide-y divide-gray-200 w-full'>
          {positions.map(position => (
            <li key={position.id}>
              <a onClick={() => onClick(position.id)} className='block hover:bg-gray-50'>
                <div className='px-4 py-4 sm:px-6'>
                  <div className='flex items-center justify-between'>
                    <p className='truncate text-lg font-semibold text-indigo-600'>{position.positionName}</p>
                    <div className='ml-2 flex flex-shrink-0'>
                      <p
                        className={classNames(
                          position.isOpen == true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                          'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
                        )}
                      >
                        {position.isOpen}
                      </p>
                    </div>
                  </div>
                  <div className='mt-2 sm:flex sm:justify-between'>
                    <div className='sm:flex'>
                      <p className='flex items-center text-xs text-gray-500'>
                        <BriefcaseIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                        {position.jobType}
                      </p>
                      <p className='mt-2 flex items-center text-xs text-gray-500 sm:mt-0 sm:ml-6'>
                        <CurrencyDollarIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                        SGD{' '}
                        {position.salaryType == 'Fixed'
                          ? position.salaryRange[0]
                          : position.salaryRange[0] + ' ~ ' + position.salaryRange[1]}
                      </p>
                      <p className='mt-2 flex items-center text-xs text-gray-500 sm:mt-0 sm:ml-6'>
                        <HeartIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                        Dialysis Support: {position.hasDialysisSupport ? 'Yes' : 'No'}
                      </p>
                      <p className='mt-2 flex items-center text-xs text-gray-500 sm:mt-0 sm:ml-6'>
                        <ClipboardDocumentCheckIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                        Flexible: {position.hasFlexibleSchedule ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div className='mt-2 flex items-center text-xs text-gray-500 sm:mt-0'>
                      <CalendarIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                      <p>
                        Opened on <time dateTime={position.openingTime}>{position.openingTime.substring(0, 10)}</time>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Listings;
