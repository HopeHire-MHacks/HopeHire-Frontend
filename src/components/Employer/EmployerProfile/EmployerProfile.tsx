import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/User/UserService';
import { userAtom } from '@/utils/atoms/user';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const EmployerProfile = () => {
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
    user.employer && (
      <>
        <div className=' flex flex-wrap items-center justify-between sm:flex-nowrap bg-gray-50 shadow sm:rounded-lg m-5 p-2'>
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
                <h3 className='text-lg font-medium leading-6 text-gray-900'>{user.employer.name}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='overflow-hidden bg-white shadow sm:rounded-lg w-full m-5'>
          <div className='px-4 py-5 sm:px-6 w-full'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>Company Information</h3>
            <p className='mt-1 max-w-2xl text-md text-gray-500'>
              Keep your company&apos;s information up to date so that you can attract the best talent.
            </p>
          </div>
          <div className='border-t border-gray-200'>
            <dl>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-md font-medium text-gray-500'>Company Name</dt>
                <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{user.employer.name}</dd>
              </div>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-md font-medium text-gray-500'>Website</dt>
                <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0 underline'>
                  <a href={user.employer.webAddress}>{user.employer.webAddress}</a>
                </dd>
              </div>

              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-md font-medium text-gray-500'>Company Description</dt>
                <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{user.employer.companyDescription}</dd>
              </div>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-md font-medium text-gray-500'>Company address</dt>
                <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>
                  {user.employer.address +
                    ', ' +
                    user.employer.city +
                    ', ' +
                    user.employer.state +
                    ', ' +
                    user.employer.country +
                    ', ' +
                    user.employer.postalCode}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-md font-medium text-gray-500'>Number of Employees</dt>
                <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{user.employer.numberOfEmployees}</dd>
              </div>
            </dl>
          </div>
        </div>
      </>
    )
  );
};

export default EmployerProfile;
