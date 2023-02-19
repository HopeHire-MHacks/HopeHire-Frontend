import React, { useEffect, useState } from 'react';
import industryTypes from '@/constants/industryTypes';
import { useParams } from 'react-router-dom';
import { useApi } from '@/api/ApiHandler';
import JobService, { JobData } from '@/api/Jobs/JobService';
import { userAtom } from '@/utils/atoms/user';
import { useRecoilState } from 'recoil';
import { MapPinIcon, UsersIcon } from '@heroicons/react/24/outline';
import { ReactComponent as HealthIcon } from '@/assets/health_icon.svg';

const JobListing = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobData>();
  const [user] = useRecoilState(userAtom);
  const [imageUrl, setImageUrl] = useState('');
  const [getJob] = useApi((id: number) => JobService.getJobById(id), true, true, true);

  const getJobListing = async () => {
    const res = await getJob(Number(id));
    if (res && res.data) {
      setJob(res.data);
      console.log(res.data);
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

  type EmployeeData = {
    name: string;
    userId: number;
    personalStatement: string;
    skills: number[];
    interests: number[];
    isAvailable: boolean;
    dateOfBirth: string;
    remarks: string;
    availableTimes: string[];
    preferredLocation: number[];
    dialysisFrequency: number;
    profilePhoto: { type: 'Buffer'; data: number[] };
    resume: { type: 'Buffer'; data: number[] };
    country: string;
    city: string;
    state: string;
    postalCode: string;
    address: string;
  };

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
          <div className='overflow-hidden bg-white shadow sm:rounded-lg m-5'>
            <div className='px-4 py-5 sm:px-6'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>Job Information</h3>
              <p className='mt-1 max-w-2xl text-md text-gray-500'>
                Get the inside scoop on your next career move with our comprehensive job listing.
              </p>
            </div>
            <div className='border-t border-gray-200'>
              <dl>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Position name</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.positionName}</dd>
                </div>

                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Job Description</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.jobDescription}</dd>
                </div>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Job Requirements</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.jobRequirements}</dd>
                </div>
                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Industry Type</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{industryTypes[job.industryType]}</dd>
                </div>

                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Job Flexibility</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.jobFlexibility}</dd>
                </div>
                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Peritonial Dialysis Support</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>
                    {job.hasDialysisSupport ? 'Available' : 'Not Available'}
                  </dd>
                </div>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Location</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>
                    {job.address + ', ' + job.city + ', ' + job.state + ', ' + job.country + ', ' + job.postalCode}
                  </dd>
                </div>

                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Part Time / Full Time</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.jobType}</dd>
                </div>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Salary Type</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.salaryType}</dd>
                </div>
                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Salary Range</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>
                    {job.salaryType === 'ranged' && '$' + job.salaryRange[0] + ' - $' + job.salaryRange[1]}
                    {job.salaryType === 'fixed' && '$' + job.salaryRange[0]}
                    {job.salaryType === 'none-yet' && '$' + job.salaryRange[0]}
                  </dd>
                </div>

                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Physical Demand</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.physicalDemands}</dd>
                </div>
              </dl>
            </div>
          </div>
        </>
      ) : (
        <div>loading...</div>
      )}

      <div className='m-5 w-full'>
        <div className='overflow-hidden rounded-lg bg-white shadow'>
          <div className='border-b border-gray-200 bg-white px-4 py-5 sm:px-6'>
            <div className='-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap'>
              <div className='ml-4 mt-4'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>Recieved Application</h3>
                <p className='mt-1 text-md text-gray-500'>Here are some applicants that already </p>
              </div>
            </div>
          </div>
        </div>
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
      </div>

      <div className='m-5 w-full'>
        <div className='overflow-hidden rounded-lg bg-white shadow'>
          <div className='border-b border-gray-200 bg-white px-4 py-5 sm:px-6'>
            <div className='-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap'>
              <div className='ml-4 mt-4'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>Recommended Employees</h3>
                <p className='mt-1 text-md text-gray-500'>Here are some recommended employees based on this job profile!</p>
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default JobListing;
