import React, { useEffect, useState } from 'react';
import industryTypes from '@/constants/industryTypes';
import { useParams } from 'react-router-dom';
import EmployerDetails from '../Employer/EmployerDetails';
import { useApi } from '@/api/ApiHandler';
import JobService, { JobData } from '@/api/Jobs/JobService';
import { userAtom } from '@/utils/atoms/user';
import { useRecoilState } from 'recoil';

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
                    {'$' + job.salaryRange[0] + ' - $' + job.salaryRange[1]}
                  </dd>
                </div>

                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-md font-medium text-gray-500'>Physical Demand</dt>
                  <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{job.physicalDemands}</dd>
                </div>
              </dl>
            </div>
          </div>

          <EmployerDetails employer={job.employer} />
        </>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default JobListing;
