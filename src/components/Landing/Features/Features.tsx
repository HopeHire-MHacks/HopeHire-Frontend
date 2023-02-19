import { CheckCircleIcon, NewspaperIcon, UserGroupIcon } from '@heroicons/react/20/solid';

import React from 'react';
import img from '@/assets/matching.png';

const features = [
  {
    name: 'Accurate matches.',
    description: 'Our AI algorithm considers proximity to dialysis centers, work scheduling, and soft skills.',
    icon: CheckCircleIcon,
  },
  {
    name: 'Intuitive user interface.',
    description: 'Our website is designed with everyone in mind.',
    icon: UserGroupIcon,
  },
  {
    name: 'Inclusive profile building.',
    description: 'We use Natural Language Processing to extract soft skills from personal statements. (Future Feature)',
    icon: NewspaperIcon,
  },
];

const Features = () => {
  return (
    <div id='features' className='overflow-hidden py-12 sm:py-12'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
          <div className='lg:pr-8 lg:pt-4'>
            <div className='lg:max-w-lg'>
              <h2 className='text-lg font-semibold leading-8 tracking-tight text-indigo-600'>Using AI</h2>
              <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>A better job match</p>
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                We use a machine learning recommender system to match kidney disease-affected employees with employers based on the needs of
                both parties.
              </p>
              <dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                {features.map(feature => (
                  <div key={feature.name} className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <feature.icon className='absolute top-1 left-1 h-5 w-5 text-indigo-600' aria-hidden='true' />
                      {feature.name}
                    </dt>{' '}
                    <dd className='inline'>{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src={img}
            alt='Product screenshot'
            className='w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0'
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
