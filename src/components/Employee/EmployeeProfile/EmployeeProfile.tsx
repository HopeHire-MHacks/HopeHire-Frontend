import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/User/UserService';
import { userAtom } from '@/utils/atoms/user';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import EmployeeDetails from '../EmployeeDetails';

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
          <EmployeeDetails employee={user.employee} />
        </div>
      </>
    )
  );
};

export default EmployeeProfile;
