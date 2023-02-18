import React, { useState } from 'react';
import { employeeOnboardAtom } from '@/utils/atoms/forms/employeeOnboard';
import { useRecoilState } from 'recoil';
import { ToasterType, toasterAtom } from '@/utils/atoms/toaster';
import DateTime from '@/utils/DateTime';
import AutoFillAddress from '@components/Onboard/YourInformation/AutoFillAddress';

interface EmployeeInformationProps {
  onNext: () => void;
}

const EmployeeInformation = ({ onNext }: EmployeeInformationProps) => {
  const [employeeOnboard, setEmployeeOnboard] = useRecoilState(employeeOnboardAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToaster] = useRecoilState(toasterAtom);
  const dateOfBirth = DateTime.newDateTimeFromDate(new Date(employeeOnboard.dateOfBirth));
  const dateOfBirthString = dateOfBirth.toTimezoneDate('Asia/Singapore').format('YYYY-MM-DD');
  const [profilePicUrl, setProfilePicUrl] = useState<string>();

  const getNewDateOfBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateOfBirth = DateTime.newDateTimeFromDate(new Date(e.target.value)).toString();
    setEmployeeOnboard(prev => ({ ...prev, dateOfBirth: newDateOfBirth }));
  };

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isPhoto = true) => {
    const target = e.target.files;
    const file = target && target[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function () {
      const arrBuffer = reader.result as ArrayBuffer;
      if (isPhoto) {
        setProfilePicUrl(URL.createObjectURL(new Blob([arrBuffer])));
        setEmployeeOnboard(prev => ({ ...prev, profilePhoto: arrBuffer }));
      } else {
        setEmployeeOnboard(prev => ({ ...prev, resume: arrBuffer }));
      }
    };
    reader.onerror = function (error) {
      setToaster({ isShown: true, type: ToasterType.ERROR, message: 'Error uploading logo', title: 'Error' });
      console.log('Error: ', error);
    };
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (
      employeeOnboard.name.length === 0 ||
      employeeOnboard.personalStatement.length === 0 ||
      employeeOnboard.remarks.length === 0 ||
      employeeOnboard.dialysisFrequency === 0 ||
      employeeOnboard.profilePhoto === null ||
      employeeOnboard.resume === null ||
      employeeOnboard.postalCode.length === 0 ||
      employeeOnboard.address.length === 0 ||
      employeeOnboard.city.length === 0 ||
      employeeOnboard.state.length === 0 ||
      employeeOnboard.country.length === 0
    ) {
      setToaster({ isShown: true, type: ToasterType.ERROR, message: 'Please fill in all the fields', title: 'Error' });
      return;
    }
    onNext();
  };

  return (
    <div className='w-full flex justify-center'>
      <div className='space-y-6 max-w-7xl mt-10'>
        <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>Personal Information</h3>
              <p className='mt-1 text-sm text-gray-500'>Use a permanent address where you can receive mail.</p>
            </div>
            <div className='mt-5 md:col-span-2 md:mt-0'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='first-name' className='block text-sm font-medium text-gray-700'>
                    Full name
                  </label>
                  <input
                    value={employeeOnboard.name}
                    onChange={e => setEmployeeOnboard(prev => ({ ...prev, name: e.target.value }))}
                    type='text'
                    name='full-name'
                    id='full-name'
                    autoComplete='given-name'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
                    Date of Birth
                  </label>
                  <input
                    value={dateOfBirthString}
                    onChange={getNewDateOfBirth}
                    type='date'
                    name='last-name'
                    id='last-name'
                    autoComplete='family-name'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
                    Dialysis Frequency
                  </label>
                  <input
                    value={employeeOnboard.dialysisFrequency}
                    onChange={e => setEmployeeOnboard(prev => ({ ...prev, dialysisFrequency: parseInt(e.target.value) }))}
                    type='number'
                    name='dialysis-frequency'
                    id='dialysis-frequency'
                    autoComplete='dialysis-frequency'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>

                <div className='col-span-6 sm:col-span-6'>
                  <label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
                    Medical Remarks
                  </label>
                  <input
                    value={employeeOnboard.remarks}
                    onChange={e => setEmployeeOnboard(prev => ({ ...prev, remarks: e.target.value }))}
                    type='text'
                    name='dialysis-frequency'
                    id='dialysis-frequency'
                    autoComplete='dialysis-frequency'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
                <AutoFillAddress
                  address={employeeOnboard.address}
                  city={employeeOnboard.city}
                  country={employeeOnboard.country}
                  postalCode={employeeOnboard.postalCode}
                  state={employeeOnboard.state}
                  onSetAddress={address => setEmployeeOnboard(prev => ({ ...prev, address }))}
                  onSetCity={city => setEmployeeOnboard(prev => ({ ...prev, city }))}
                  onSetCountry={country => setEmployeeOnboard(prev => ({ ...prev, country }))}
                  onSetPostalCode={postalCode => setEmployeeOnboard(prev => ({ ...prev, postalCode }))}
                  onSetState={state => setEmployeeOnboard(prev => ({ ...prev, state }))}
                />
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
              <div>
                <label htmlFor='about' className='block text-sm font-medium text-gray-700'>
                  Personal Statement
                </label>
                <div className='mt-1'>
                  <textarea
                    value={employeeOnboard.personalStatement}
                    onChange={e => setEmployeeOnboard(prev => ({ ...prev, personalStatement: e.target.value }))}
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
                    <img className='object-cover' src={profilePicUrl} />
                  </span>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>Profile photo</label>
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
                    <div className='flex text-sm text-gray-600'>
                      <label
                        htmlFor='file-upload'
                        className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
                      >
                        <span>Upload a file</span>
                        <input
                          onChange={e => onFileUpload(e, true)}
                          accept='image/*'
                          id='file-upload'
                          name='file-upload'
                          type='file'
                          className='sr-only'
                        />
                      </label>
                    </div>
                    <p className='text-xs text-gray-500'>PNG, JPG, GIF</p>
                  </div>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>Resume</label>
                <div className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                  <div className='space-y-1 text-center'>
                    <div className='w-full flex justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-10 h-10 text-gray-400'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
                        />
                      </svg>
                    </div>
                    <div className='flex text-sm text-gray-600'>
                      <label
                        htmlFor='file-upload-2'
                        className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
                      >
                        <span>Upload a file</span>
                        <input
                          onChange={e => onFileUpload(e, false)}
                          accept='application/pdf'
                          type='file'
                          className='sr-only'
                          id='file-upload-2'
                          name='file-upload-2'
                        />
                      </label>
                    </div>
                    <p className='text-xs text-gray-500'>PDF up to 5MB</p>
                  </div>
                </div>
                <p className='italic mt-2'>{employeeOnboard.resumeName}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end py-5 mr-5 xl:mr-0'>
          <button
            type='submit'
            onClick={e => handleNext(e)}
            className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInformation;
