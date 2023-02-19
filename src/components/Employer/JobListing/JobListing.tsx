import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '@/api/ApiHandler';
import JobService, { JobData } from '@/api/Jobs/JobService';
import { userAtom } from '@/utils/atoms/user';
import { useRecoilState } from 'recoil';
import { MapPinIcon, UsersIcon } from '@heroicons/react/24/outline';
import { ReactComponent as HealthIcon } from '@/assets/health_icon.svg';
import JobDetails from '@/components/JobDetails';
import EmployerService from '@/api/Employer/EmployerService';
import Accordion from '@/components/Accordion';

const JobListing = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobData>();
  const [user] = useRecoilState(userAtom);
  const [imageUrl, setImageUrl] = useState('');
  const [getJob] = useApi((jobId: number) => JobService.getJobById(jobId), true, true, true);
  const [getRecommendedEmployees] = useApi((jobId: number) => EmployerService.getRecommendedEmployees(jobId), true, true, true);

  const getJobListing = async () => {
    const currJobRes = await getJob(Number(id));
    const recommendedEmployeesRes = await getRecommendedEmployees(Number(id));

    if (currJobRes && currJobRes.data) {
      setJob(currJobRes.data);
      // console.log(currJobRes.data);
    }

    if (recommendedEmployeesRes && recommendedEmployeesRes.data) {
      console.log(recommendedEmployeesRes.data);
    }
  };

  useEffect(() => {
    getJobListing();
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
    <div>
      {job ? (
        <>
          <div className=' flex flex-wrap items-center justify-between sm:flex-nowrap bg-gray-50 shadow sm:rounded-lg m-5 p-2'>
            <div className='ml-3'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <img className='h-12 w-12 rounded-full' src={imageUrl} alt='' />
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium leading-6 text-gray-900'>{job.employer.name}</h3>
                </div>
              </div>
            </div>
          </div>
          <JobDetails defaultOpen={false} job={job} />
        </>
      ) : (
        <div>loading...</div>
      )}

      <Accordion defaultOpen={false} title='Recieved Application' description='Here are some applicants that already applied'>
        <div className=' divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x'>
          <div className='overflow-hidden bg-white shadow sm:rounded-md'>
            <ul role='list' className='divide-y divide-gray-200'>
              <li>
                <a className='block hover:bg-gray-50'>
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
                        <p className='truncate text-sm font-medium text-indigo-600'>Name</p>
                        <div className='ml-2 flex flex-shrink-0'>
                          <p className='inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'>Name</p>
                        </div>
                      </div>
                      <div className='mt-2 sm:flex sm:justify-between'>
                        <div className='sm:flex'>
                          <p className='flex items-center text-sm text-gray-500'>
                            <UsersIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                            Name
                          </p>
                          <p className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6'>
                            <MapPinIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                            Name
                          </p>

                          <p className={'mt-2 flex items-center text-sm text-green-500 sm:mt-0 sm:ml-6'}>
                            <HealthIcon fill='#22C55E' className='mr-1.5 h-6 w-6 flex-shrink-0 text-gray-400' aria-hidden='true' />
                            Peritoneal Dialysis-Friendly
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Accordion>

      <Accordion
        defaultOpen={false}
        title='Recommended Applicants'
        description='Here are some recommended applicants based on your job information'
      >
        <div className=' divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x'>
          <div className='overflow-hidden bg-white shadow sm:rounded-md'>
            <ul role='list' className='divide-y divide-gray-200'>
              <li>
                <a className='block hover:bg-gray-50'>
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
                        <p className='truncate text-sm font-medium text-indigo-600'>Name</p>
                        <div className='ml-2 flex flex-shrink-0'>
                          <p className='inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'>Name</p>
                        </div>
                      </div>
                      <div className='mt-2 sm:flex sm:justify-between'>
                        <div className='sm:flex'>
                          <p className='flex items-center text-sm text-gray-500'>
                            <UsersIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                            Name
                          </p>
                          <p className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6'>
                            <MapPinIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                            Name
                          </p>

                          <p className={'mt-2 flex items-center text-sm text-green-500 sm:mt-0 sm:ml-6'}>
                            <HealthIcon fill='#22C55E' className='mr-1.5 h-6 w-6 flex-shrink-0 text-gray-400' aria-hidden='true' />
                            Peritoneal Dialysis-Friendly
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default JobListing;
