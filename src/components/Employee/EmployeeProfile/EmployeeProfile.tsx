import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/User/UserService';
import Calendar from '@/components/Calendar';
import Badge from '@/components/Onboard/YourInformation/Badge';
import { INTERESTS, SOFT_SKILLS } from '@/constants/seedData';
import { userAtom } from '@/utils/atoms/user';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const EmployeeProfile = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [getSelf] = useApi(() => UserService.getSelf(), false, false, false);

  const getUser = async () => {
    const res = await getSelf();
    if (res && res.data) {
      setUser(prev => ({ ...prev, ...res.data }));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    user.employee && (
      <>
        <div className='w-full'>
          <div className=' flex flex-wrap items-center justify-between sm:flex-nowrap w-full bg-gray-50 shadow sm:rounded-lg m-5 p-2'>
            <div className='ml-3'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-12 w-12 rounded-full'
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt=''
                  />
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium leading-6 text-gray-900'>{user.employee.name}</h3>
                </div>
              </div>
            </div>
          </div>
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
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{user.employee.name}</dd>
                </div>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Date of Birth</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>
                    {new Date(user.employee.dateOfBirth).toLocaleDateString()}
                  </dd>
                </div>

                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Address</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>
                    {user.employee.address +
                      ', ' +
                      user.employee.city +
                      ', ' +
                      user.employee.state +
                      ', ' +
                      user.employee.country +
                      ', ' +
                      user.employee.postalCode}
                  </dd>
                </div>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Personal Statement</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{user.employee.personalStatement}</dd>
                </div>
                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Skills</dt>
                  <div className='mt-5 md:col-span-2 md:mt-0'>
                    <div className='flex flex-wrap gap-2'>
                      {' '}
                      {SOFT_SKILLS.filter(x => user.employee?.skills.includes(x.id)).map(skill => {
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
                      {INTERESTS.filter(x => user.employee?.skills.includes(x.id)).map(skill => {
                        return <Badge defaultState={true} text={skill.name} value={skill.id} key={skill.id} />;
                      })}
                    </div>
                  </div>
                </div>
                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Dialysis Frequency</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>
                    {user.employee.dialysisFrequency + ' times per week'}
                  </dd>
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
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{user.employee.remarks}</dd>
                </div>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Looking for Open Jobs?</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{user.employee.isAvailable ? 'Yes' : 'No'}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default EmployeeProfile;
