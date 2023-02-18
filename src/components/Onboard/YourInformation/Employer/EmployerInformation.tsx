import React from 'react';
import { useRecoilState } from 'recoil';
import { employerOnboardAtom } from '@/utils/atoms/forms/employerOnboard';
import { toasterAtom, ToasterType } from '@/utils/atoms/toaster';
import { useApi } from '@/api/ApiHandler';
import EmployerService, { CreateEmployerData } from '@/api/Employer/EmployerService';
import AutoFillAddress from '../AutoFillAddress';

const EmployerInformation = () => {
  const [employerOnboard, setEmployerOnboard] = useRecoilState(employerOnboardAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToaster] = useRecoilState(toasterAtom);
  const [createEmployer] = useApi((data: CreateEmployerData) => EmployerService.createEmployer(data ?? null), false, true, false);

  const onSubmit = async () => {
    if (
      employerOnboard.companyName.length === 0 ||
      employerOnboard.companyWebsite.length === 0 ||
      employerOnboard.companyDescription.length === 0 ||
      employerOnboard.logo.length === 0 ||
      employerOnboard.postalCode.length === 0 ||
      employerOnboard.numberOfEmployees === 0
    ) {
      setToaster({ isShown: true, type: ToasterType.ERROR, message: 'Please enter all fields', title: 'Error' });
      return;
    }

    const createEmployerData: CreateEmployerData = {
      companyWebsite: employerOnboard.companyWebsite,
      companyName: employerOnboard.companyName,
      companyDescription: employerOnboard.companyDescription,
      logo: employerOnboard.logo,
      address: employerOnboard.postalCode,
      numberOfEmployees: employerOnboard.numberOfEmployees,
      latLong: employerOnboard.latLong,
      userId: 1,
    };
    const res = await createEmployer(createEmployerData);
    if (res) {
      console.log(res);
    }
  };

  const onLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.files;
    const file = target && target[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setEmployerOnboard(prev => ({ ...prev, logo: reader.result as string }));
    };
    reader.onerror = function (error) {
      setToaster({ isShown: true, type: ToasterType.ERROR, message: 'Error uploading logo', title: 'Error' });
      console.log('Error: ', error);
    };
  };

  return (
    <div className='w-full flex justify-center'>
      <form className='space-y-6 max-w-7xl mt-10' action='#' method='POST'>
        <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>Company Information</h3>
              <p className='mt-1 text-sm text-gray-500'>Use a permanent address where you can receive mail.</p>
            </div>
            <div className='mt-5 md:col-span-2 md:mt-0'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='first-name' className='block text-sm font-medium text-gray-700'>
                    Company name
                  </label>
                  <input
                    value={employerOnboard.companyName}
                    onChange={e => setEmployerOnboard(prev => ({ ...prev, companyName: e.target.value }))}
                    type='text'
                    name='company-name'
                    id='company-name'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='first-name' className='block text-sm font-medium text-gray-700'>
                    Number of Employees
                  </label>
                  <input
                    value={employerOnboard.numberOfEmployees}
                    onChange={e => setEmployerOnboard(prev => ({ ...prev, numberOfEmployees: parseInt(e.target.value) }))}
                    type='number'
                    name='company-size'
                    id='company-size'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
                <AutoFillAddress />
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>Profile</h3>
              <p className='mt-1 text-sm text-gray-500'>This information will be displayed publicly so be careful what you share.</p>
            </div>
            <div className='mt-5 space-y-6 md:col-span-2 md:mt-0'>
              <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-3 sm:col-span-2'>
                  <label htmlFor='company-website' className='block text-sm font-medium text-gray-700'>
                    Website
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500'>
                      http://
                    </span>
                    <input
                      value={employerOnboard.companyWebsite}
                      onChange={e => setEmployerOnboard(prev => ({ ...prev, companyWebsite: e.target.value }))}
                      type='text'
                      name='company-website'
                      id='company-website'
                      className='block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      placeholder='www.example.com'
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor='about' className='block text-sm font-medium text-gray-700'>
                  About your Company
                </label>
                <div className='mt-1'>
                  <textarea
                    value={employerOnboard.companyDescription}
                    onChange={e => setEmployerOnboard(prev => ({ ...prev, companyDescription: e.target.value }))}
                    id='about'
                    name='about'
                    rows={3}
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
                <p className='mt-2 text-sm text-gray-500'>Brief description about you for your profile.</p>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>Photo</label>
                <div className='mt-1 flex items-center space-x-5'>
                  <span className='inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100'>
                    <img className='object-cover' src={employerOnboard.logo} />
                  </span>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>Company Logo</label>
                <div className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                  <div className='space-y-1 text-center'>
                    <svg
                      className='mx-auto h-12 w-12 text-gray-400'
                      stroke='currentColor'
                      fill='none'
                      viewBox='0 0 48 48'
                      aria-hidden='true'
                    >
                      <path
                        d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <div className='flex text-sm text-gray-600 justify-center'>
                      <label
                        htmlFor='file-upload'
                        className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
                      >
                        <span>Upload a file</span>
                        <input
                          accept='image/*'
                          onChange={e => onLogoUpload(e)}
                          id='file-upload'
                          name='file-upload'
                          type='file'
                          className='sr-only'
                        />
                      </label>
                    </div>
                    <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end py-5 mr-5 xl:mr-0'>
          <button
            onClick={e => {
              e.preventDefault();
              onSubmit();
            }}
            type='submit'
            className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployerInformation;
