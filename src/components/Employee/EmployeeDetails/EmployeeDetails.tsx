import { EmployeeData } from '@/api/Employee/EmployeeService';
import Calendar from '@/components/Calendar';
import Badge from '@/components/Onboard/YourInformation/Badge';
import { SOFT_SKILLS, INTERESTS } from '@/constants/seedData';
import React from 'react';

interface Props {
  employee: EmployeeData;
}

const EmployeeDetails = ({ employee }: Props) => {
  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-lg w-full m-5'>
      <div className='px-4 py-5 sm:px-6 w-full'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>User Information</h3>
        <p className='mt-1 max-w-2xl text-md text-gray-500'>
          Keep your personal information up to date so that you can receive the best experience from our platform.
        </p>
      </div>
      <div className='border-t border-gray-200'>
        <dl>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-md font-medium text-gray-500'>Name</dt>
            <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{employee.name}</dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-md font-medium text-gray-500'>Date of Birth</dt>
            <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{new Date(employee.dateOfBirth).toLocaleDateString()}</dd>
          </div>

          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-md font-medium text-gray-500'>Address</dt>
            <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>
              {employee.address + ', ' + employee.city + ', ' + employee.state + ', ' + employee.country + ', ' + employee.postalCode}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-md font-medium text-gray-500'>Personal Statement</dt>
            <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{employee.personalStatement}</dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-md font-medium text-gray-500'>Skills</dt>
            <div className='mt-5 md:col-span-2 md:mt-0'>
              <div className='flex flex-wrap gap-2'>
                {' '}
                {SOFT_SKILLS.filter(x => employee?.skills.includes(x.id)).map(skill => {
                  return <Badge defaultState={true} text={skill.name} value={skill.id} key={skill.id} />;
                })}
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-md font-medium text-gray-500'>Interests</dt>
            <div className='mt-5 md:col-span-2 md:mt-0'>
              <div className='flex flex-wrap gap-2'>
                {' '}
                {INTERESTS.filter(x => employee?.skills.includes(x.id)).map(skill => {
                  return <Badge defaultState={true} text={skill.name} value={skill.id} key={skill.id} />;
                })}
              </div>
            </div>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-md font-medium text-gray-500'>Dialysis Frequency</dt>
            <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{employee.dialysisFrequency + ' times per week'}</dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-md font-medium text-gray-500'>Available TIme</dt>
            <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>
              <Calendar
                availabilities={[]}
                setAvailabilities={() => {
                  return;
                }}
                periodTitle='Available'
              />
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-md font-medium text-gray-500'>Remarks</dt>
            <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{employee.remarks}</dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-md font-medium text-gray-500'>Looking for Open Jobs?</dt>
            <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{employee.isAvailable ? 'Yes' : 'No'}</dd>
          </div>
          {/* <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Attachments</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>
                <ul role='list' className='divide-y divide-gray-200 rounded-md border border-gray-200'>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-md'>
                    <div className='flex w-0 flex-1 items-center'>
                      <PaperClipIcon className='h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                      <span className='ml-2 w-0 flex-1 truncate'>resume_back_end_developer.pdf</span>
                    </div>
                    <div className='ml-4 flex-shrink-0'>
                      <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                        Download
                      </a>
                    </div>
                  </li>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-md'>
                    <div className='flex w-0 flex-1 items-center'>
                      <PaperClipIcon className='h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                      <span className='ml-2 w-0 flex-1 truncate'>coverletter_back_end_developer.pdf</span>
                    </div>
                    <div className='ml-4 flex-shrink-0'>
                      <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                        Download
                      </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div> */}
        </dl>
      </div>
    </div>
  );
};

export default EmployeeDetails;
