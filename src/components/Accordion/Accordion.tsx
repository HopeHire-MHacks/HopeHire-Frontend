import React, { ReactNode, useState } from 'react';

interface Props {
  title: string;
  description: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

function Accordion({ title, defaultOpen = true, description, children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-lg m-5'>
      <div className='px-4 py-5 sm:px-6 flex justify-between' onClick={() => setIsOpen(!isOpen)}>
        <div>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>{title}</h3>
          <p className='mt-1 max-w-2xl text-md text-gray-500'>{description}</p>
        </div>
        <div className='self-end'>
          <button
            className='flex items-center justify-between w-full px-4 py-2 text-lg font-medium text-left text-gray-700 bg-white rounded-lg hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300'
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className={`w-6 h-6 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && children}
    </div>
  );
}

export default Accordion;
