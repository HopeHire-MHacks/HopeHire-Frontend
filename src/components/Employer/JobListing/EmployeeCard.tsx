import React, { useState, useEffect } from 'react';

import { EmployeeData } from '@/api/Employee/EmployeeService';
import { BeakerIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { SOFT_SKILLS } from '@/constants/seedData';

const EmployeeCard = ({ employee }: { employee: EmployeeData }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    let data = null;
    if (employee.profilePhoto != null) {
      data = employee.profilePhoto.data;
    }

    if (data == null) {
      return;
    }

    const blob = new Blob([new Uint8Array(data)], { type: 'image/jpeg' });
    setImageUrl(URL.createObjectURL(blob));
  }, [employee]);

  return (
    <li>
      <a className='block hover:bg-gray-50'>
        <div className='px-4 py-4 sm:px-6 sm:pl-2 flex'>
          <div className='flex items-center w-12 justify-between'>
            <img className='h-12 w-12 rounded-full' src={imageUrl} alt='' />
          </div>

          <div className='w-full pl-3'>
            <div className='grid grid-cols-2 w-full'>
              <div className='items-center justify-between grid grid-rows-2 grid-cols-1'>
                <p className='truncate text-sm font-medium text-indigo-600'>{employee.name}</p>
                <div className='mt-2 sm:flex'>
                  <p className='flex items-center text-sm text-gray-500 sm:mt-0 sm:mr-5'>
                    <MapPinIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                    {employee.address + ', ' + employee.city + ', ' + employee.state + ', ' + employee.country + ', ' + employee.postalCode}
                  </p>

                  <p className={'flex items-center text-sm text-gray-500 sm:mt-0 sm:mr-5'}>
                    <BeakerIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                    Dialysis Frequency: {employee.dialysisFrequency} / week
                  </p>
                </div>
              </div>
              <div className='flex flex-wrap justify-end'>
                {employee.skills.map(skill => (
                  <p key={skill} className='h-5 rounded-full bg-green-100 px-2 m-1 text-xs font-semibold leading-5 text-green-800'>
                    {SOFT_SKILLS[skill].name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

export default EmployeeCard;
