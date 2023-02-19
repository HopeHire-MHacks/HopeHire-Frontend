import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '@/api/ApiHandler';
import JobService, { JobData } from '@/api/Jobs/JobService';
import { userAtom } from '@/utils/atoms/user';
import { useRecoilState } from 'recoil';
import EmployeeCard from './EmployeeCard';
import JobDetails from '@/components/JobDetails';
import EmployerService from '@/api/Employer/EmployerService';
import ApplicationService from '@/api/Applications/ApplicationService';
import Accordion from '@/components/Accordion';
import { EmployeeData } from '@/api/Employee/EmployeeService';
import { useHistory } from 'react-router-dom';
import { routes } from '@/constants/routes';

const JobListing = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobData>();
  const [recommendedEmployees, setRecommendedEmployees] = useState<EmployeeData[]>();
  const [applicants, setApplicants] = useState<EmployeeData[]>();
  const [user] = useRecoilState(userAtom);
  const [imageUrl, setImageUrl] = useState('');
  const history = useHistory();

  const [getJob] = useApi((jobId: number) => JobService.getJobById(jobId), true, true, true);
  const [getApplicants] = useApi((jobId: number) => ApplicationService.getApplicationByJobId(jobId), true, true, true);
  const [getRecommendedEmployees] = useApi((jobId: number) => EmployerService.getRecommendedEmployees(jobId), true, true, true);

  const getJobListing = async () => {
    const currJobRes = await getJob(Number(id));
    if (currJobRes && currJobRes.data) {
      setJob(currJobRes.data);
    }
    const recommendedEmployeesRes = await getRecommendedEmployees(Number(id));
    if (recommendedEmployeesRes && recommendedEmployeesRes.data) {
      setRecommendedEmployees(recommendedEmployeesRes.data);
    }
    const applicantsRes = await getApplicants(Number(id));
    if (applicantsRes && applicantsRes.data) {
      setApplicants(applicantsRes.data);
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
        <div className='w-full mt-5 p-5 flex justify-center'>Loading Job Information...</div>
      )}

      {applicants ? (
        <Accordion defaultOpen={false} title='Recieved Application' description='Here are some applicants that already applied'>
          <div className=' divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x'>
            <div className='overflow-hidden bg-white shadow sm:rounded-md'>
              <ul role='list' className='divide-y divide-gray-200'>
                {applicants.length !== 0 ? (
                  applicants.map(employee => (
                    <EmployeeCard
                      onClick={() => history.push(`${routes.employer.base}${routes.employer.listing}/employee/${employee.id}`)}
                      key={employee.userId}
                      employee={employee}
                    />
                  ))
                ) : (
                  <div className='w-full p-5 flex justify-center'>No Applicants Yet</div>
                )}
              </ul>
            </div>
          </div>
        </Accordion>
      ) : (
        <div className='w-full mt-5 p-5 flex justify-center'> Loading Applicants...</div>
      )}

      {recommendedEmployees ? (
        <Accordion
          defaultOpen={false}
          title='Recommended Applicants'
          description='Here are some recommended applicants based on your job information'
        >
          <div className=' divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x'>
            <div className='overflow-hidden bg-white shadow sm:rounded-md'>
              <ul role='list' className='divide-y divide-gray-200'>
                {recommendedEmployees.map(employee => (
                  <EmployeeCard
                    onClick={() => history.push(`${routes.employer.base}${routes.employer.listing}/employee/${employee.id}`)}
                    key={employee.userId}
                    employee={employee}
                  />
                ))}
              </ul>
            </div>
          </div>
        </Accordion>
      ) : (
        <div className='w-full mt-5 p-5 flex justify-center'> Loading Recommended Employees...</div>
      )}
    </div>
  );
};

export default JobListing;
