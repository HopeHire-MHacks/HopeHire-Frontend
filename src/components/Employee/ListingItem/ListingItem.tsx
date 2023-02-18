import React from 'react';
import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/20/solid';
import { ReactComponent as HealthIcon } from '@/assets/health_icon.svg';

import industryTypes from '@/constants/industryTypes';
import { useHistory } from 'react-router-dom';
import { routes } from '@/constants/routes';

const statusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    case 'Accepted':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
interface Application {
  id: number;
  employeeId: number;
  jobId: number;
  remarks: string;
  status: string;
}
export interface Job {
  id: number;
  positionName: string;
  jobType: string;
  industryType: number;
  jobDescription: string;
  jobRequirements: string;
  jobFlexibility: string;
  latLong: number[];
  hasDialysisSupport: boolean;
  hasFlexibleSchedule: boolean;
  physicalDemands: string;
  salaryType: string;
  scheduledType: string;
  openingTime: Date;
  employerId: number;
  isOpen: boolean;
  salaryRange: number[];
  skills: number[];
  country: string;
  city: string;
  state: string;
  postalCode: string;
  address: string;
}

interface Props {
  position: Job;
  application?: Application;
}

const ListingItem = ({ position, application }: Props) => {
  const history = useHistory();

  const onClick = () => {
    console.log('here');
    history.push(routes.employee.base + routes.employee.listings + '/' + position.id);
  };
  return (
    <>
      <li key={position.id}>
        <a onClick={onClick} className='block hover:bg-gray-50'>
          <div className='px-4 py-4 sm:px-6 sm:pl-2 flex'>
            <div className='flex items-center w-12 justify-between'>
              <img
                className='h-12 w-12 rounded-full'
                src={
                  'https://media.licdn.com/dms/image/C560BAQE88xCsONDULQ/company-logo_100_100/0/1618231291419?e=1684972800&v=beta&t=77OtMEMQV6GEYwg9e5OtRSjKu1OVwoGBrXz_Dk_WSog'
                }
                alt=''
              />
            </div>
            <div className='w-full pl-3'>
              <div className='flex items-center justify-between'>
                <p className='truncate text-md font-medium text-indigo-600'>{position.positionName}</p>
                <div className='ml-2 flex flex-shrink-0'>
                  <p className='inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'>
                    {position.scheduledType}
                  </p>
                </div>
              </div>
              <div className='mt-2 sm:flex sm:justify-between'>
                <div className='sm:flex'>
                  <p className='flex items-center text-md text-gray-500'>
                    <UsersIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                    {industryTypes[position.industryType]}
                  </p>
                  <p className='mt-2 flex items-center text-md text-gray-500 sm:mt-0 sm:ml-6'>
                    <MapPinIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                    {position.city}
                  </p>
                  {position.hasDialysisSupport && (
                    <p className={'mt-2 flex items-center text-md text-green-500 sm:mt-0 sm:ml-6'}>
                      <HealthIcon fill='#22C55E' className='mr-1.5 h-6 w-6 flex-shrink-0 text-gray-400' aria-hidden='true' />
                      Peritoneal Dialysis-Friendly
                    </p>
                  )}
                </div>
                <div className='mt-2 flex items-center text-md text-gray-500 sm:mt-0'>
                  {!application && (
                    <>
                      <CalendarIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                      <p>Closing Tomorrow</p>
                    </>
                  )}
                  {application && (
                    <p className={'inline-flex rounded-full px-2 text-xs font-semibold leading-5 ' + statusColor(application.status)}>
                      {application.status}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </a>
      </li>
    </>
  );
};

export default ListingItem;
