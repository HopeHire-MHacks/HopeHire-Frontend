import React from 'react';

import { CheckIcon } from '@heroicons/react/20/solid';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export enum Tier {
  EMPLOYER = 'tier-employer',
  EMPLOYEE = 'tier-employee',
}

interface TierProps {
  selected: Tier;
  setSelected: (tier: Tier) => void;
  onNext: () => void;
}

const ChooseProfile = ({ selected, setSelected, onNext }: TierProps) => {
  const tiers = [
    {
      name: 'Employer',
      id: Tier.EMPLOYER,
      href: '#',
      description: 'Choose Employer if you are looking to hire.',
      features: ['A.I. Powered Employee Matching', 'Create job listings', 'Job Application Mangagement'],
      mostPopular: selected === Tier.EMPLOYER,
    },
    {
      name: 'Employee',
      id: Tier.EMPLOYEE,
      href: '#',
      description: 'Choose Employee if you are looking for a job.',
      features: [
        'A.I. Powered Job Matching',
        'Job Matching based on Medical Schedule',
        'Job Matching Based on Location',
        'Job Application Mangagement',
      ],
      mostPopular: selected === Tier.EMPLOYEE,
    },
  ];

  return (
    <div className='bg-white py-16 sm:py-20'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='text-lg font-semibold leading-8 tracking-tight text-indigo-600'>Welcome</h2>
          <p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>Tell us about yourself</p>
        </div>
        <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600'>Choose the profile that best describes you!</p>
        <div className='w-full flex justify-center'>
          <div className='isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-3xl xl:mx-0 xl:max-w-3xl xl:grid-cols-2'>
            {tiers.map(tier => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200',
                  'rounded-3xl p-8 cursor-pointer',
                )}
                onClick={() => setSelected(tier.id)}
              >
                <h3
                  id={tier.id}
                  className={classNames(tier.mostPopular ? 'text-indigo-600' : 'text-gray-900', 'text-lg font-semibold leading-8')}
                >
                  {tier.name}
                </h3>
                <p className='mt-4 text-sm leading-6 text-gray-600'>{tier.description}</p>
                <p className='mt-6 flex items-baseline gap-x-1'>
                  <span className='text-4xl font-bold tracking-tight text-gray-900'></span>
                  <span className='text-sm font-semibold leading-6 text-gray-600'>{}</span>
                </p>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  onClick={onNext}
                  className={classNames(
                    tier.mostPopular
                      ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                      : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                    'mt-1 block rounded-md py-2 px-3 text-center text-sm leading-6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                  )}
                >
                  Choose
                </a>
                <ul role='list' className='mt-8 space-y-3 text-sm leading-6 text-gray-600'>
                  {tier.features.map(feature => (
                    <li key={feature} className='flex gap-x-3'>
                      <CheckIcon className='h-6 w-5 flex-none text-indigo-600' aria-hidden='true' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseProfile;
