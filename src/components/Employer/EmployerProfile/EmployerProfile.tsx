import React, { useEffect, useState } from 'react';

import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/User/UserService';
import { userAtom } from '@/utils/atoms/user';
import { useRecoilState } from 'recoil';
import EmployerDetails from '../EmployerDetails';

const EmployerProfile = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [imageUrl, setImageUrl] = useState('');
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

  useEffect(() => {
    let data = null;
    if (user.employer?.logo != null) {
      data = user.employer?.logo.data;
    }

    if (data == null) {
      return;
    }

    const blob = new Blob([new Uint8Array(data)], { type: 'image/jpeg' });
    setImageUrl(URL.createObjectURL(blob));
  }, [user.employer?.logo]);

  return (
    user.employer && (
      <>
        <div className=' flex flex-wrap items-center justify-between sm:flex-nowrap bg-gray-50 shadow sm:rounded-lg m-5 p-2'>
          <div className='ml-3'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <img className='h-12 w-12 rounded-full' src={imageUrl} alt='' />
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>{user.employer.name}</h3>
              </div>
            </div>
          </div>
        </div>
        <EmployerDetails employer={user.employer} />
      </>
    )
  );
};

export default EmployerProfile;
