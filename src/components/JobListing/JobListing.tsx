import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmployerDetails from '../Employer/EmployerDetails';
import { useApi } from '@/api/ApiHandler';
import JobService, { JobData } from '@/api/Jobs/JobService';
import { userAtom } from '@/utils/atoms/user';
import { useRecoilState } from 'recoil';
import JobDetails from '@components/JobDetails';
import ApplicationService, { CreateApplicationData } from '@/api/Applications/ApplicationService';

const JobListing = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobData>();
  const [user] = useRecoilState(userAtom);
  const [imageUrl, setImageUrl] = useState('');
  const [getJob] = useApi((id: number) => JobService.getJobById(id), true, true, true);
  const [createApplication] = useApi((data: CreateApplicationData) => ApplicationService.createApplication(data ?? null), true, true, true);

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

  const onClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    createApplication({ jobId: job!.id, status: 'Pending' });
  };

  return (
    <div>
      {job ? (
        <>
          <div className='flex-wrap items-center justify-between sm:flex-nowrap bg-gray-50 shadow sm:rounded-lg m-5 p-2'>
            <div className='ml-3'>
              <div className='m-1 flex flex-col flex-wrap items-center justify-between sm:flex-row'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <img className='h-12 w-12 rounded-full' src={imageUrl} alt='' />
                  </div>
                  <div className='ml-4'>
                    <h3 className='text-lg font-medium leading-6 text-gray-900'>{job.employer.name}</h3>
                  </div>
                </div>

                <div className='m-1 flex-shrink-0 items-center justify-center'>
                  <button
                    type='button'
                    className='relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    onClick={onClick}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <JobDetails job={job} />
          <EmployerDetails employer={job.employer} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default JobListing;
