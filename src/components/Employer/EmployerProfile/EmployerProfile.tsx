import React from 'react';

interface Employer {
  id: number;
  name: string;
  companyDescription: string;
  logo: Blob | null;
  address: string;
  userId: number;
  numberOfEmployees: number;
  latLong: number[];
  country: string;
  city: string;
  state: string;
  postalCode: string;
  webAddress: string;
}

interface Props {
  employer: Employer;
}

const EmployerProfile = ({ employer }: Props) => {
  return (
    <>
      <div className='overflow-hidden bg-white shadow sm:rounded-lg m-5'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>Company Information</h3>
          <p className='mt-1 max-w-2xl text-md text-gray-500'>
            Discover everything you need to know about your potential employer in one place.
          </p>
        </div>
        <div className='border-t border-gray-200'>
          <dl>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Company Name</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{employer.name}</dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Website</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0 underline'>
                <a href={employer.webAddress}>{employer.webAddress}</a>
              </dd>
            </div>

            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Company Description</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{employer.companyDescription}</dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Company address</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>
                {employer.address + ', ' + employer.city + ', ' + employer.state + ', ' + employer.country + ', ' + employer.postalCode}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-md font-medium text-gray-500'>Number of Employees</dt>
              <dd className='mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0'>{employer.numberOfEmployees}</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default EmployerProfile;
