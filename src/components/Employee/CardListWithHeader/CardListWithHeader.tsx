import React, { ReactNode } from 'react';

interface Props {
  header: string;
  description: string;
  buttonText: string;
  children: ReactNode;
}

const CardListWithHeader = ({ header, description, buttonText, children }: Props) => {
  return (
    <>
      <div className='m-5 w-full'>
        <div className='overflow-hidden rounded-lg bg-white shadow'>
          {' '}
          <div className='border-b border-gray-200 bg-white px-4 py-5 sm:px-6'>
            <div className='-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap'>
              <div className='ml-4 mt-4'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>{header}</h3>
                <p className='mt-1 text-md text-gray-500'>{description}</p>
              </div>
              <div className='ml-4 mt-4 flex-shrink-0'>
                <button
                  type='button'
                  className='relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=' divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x'>
          <div className='overflow-hidden bg-white shadow sm:rounded-md'>
            <ul role='list' className='divide-y divide-gray-200'>
              {children}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardListWithHeader;
