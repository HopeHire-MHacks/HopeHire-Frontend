import React from 'react';
import { useRecoilState } from 'recoil';
import { employeeOnboardAtom } from '@/utils/atoms/forms/employeeOnboard';
import { ToasterType, toasterAtom } from '@/utils/atoms/toaster';
import { INTERESTS, SOFT_SKILLS } from '@/constants/seedData';
import Badge from '@components/Onboard/YourInformation/Badge';

interface EmployeeSkillsProps {
  onNext: () => void;
}

const EmployeeSkills = ({ onNext }: EmployeeSkillsProps) => {
  const [employeeOnboard, setEmployeeOnboard] = useRecoilState(employeeOnboardAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToaster] = useRecoilState(toasterAtom);

  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (employeeOnboard.skills.length === 0 || employeeOnboard.interests.length === 0) {
      setToaster({ isShown: true, type: ToasterType.ERROR, message: 'Please fill in all the fields', title: 'Error' });
      return;
    }
    onNext();
  };

  const handleInterestClick = (id: number) => {
    if (employeeOnboard.interests.includes(id)) {
      setEmployeeOnboard(prev => ({ ...prev, interests: prev.interests.filter(i => i !== id) }));
    } else {
      setEmployeeOnboard(prev => ({ ...prev, interests: [...prev.interests, id] }));
    }
  };

  const handleSoftSkillClick = (id: number) => {
    if (employeeOnboard.skills.includes(id)) {
      setEmployeeOnboard(prev => ({ ...prev, skills: prev.skills.filter(i => i !== id) }));
    } else {
      setEmployeeOnboard(prev => ({ ...prev, skills: [...prev.skills, id] }));
    }
  };

  return (
    <>
      <div className='w-full flex justify-center'>
        <form className='space-y-6 max-w-7xl mt-10' action='#' method='POST'>
          <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6'>
            <div className='md:grid md:grid-cols-3 md:gap-6'>
              <div className='md:col-span-1'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>Pick Your Skills</h3>
                <p className='mt-1 text-sm text-gray-500'>Select the Skills that best describe you</p>
              </div>
              <div className='mt-5 md:col-span-2 md:mt-0'>
                <div className='flex flex-wrap gap-2'>
                  {SOFT_SKILLS.map(skill => {
                    return (
                      <Badge
                        defaultState={employeeOnboard.skills.includes(skill.id)}
                        onClick={handleSoftSkillClick}
                        text={skill.name}
                        value={skill.id}
                        key={skill.id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6'>
            <div className='md:grid md:grid-cols-3 md:gap-6'>
              <div className='md:col-span-1'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>Pick Your Interests</h3>
                <p className='mt-1 text-sm text-gray-500'>Select the Interests that stand out the most to you</p>
              </div>
              <div className='mt-5 md:col-span-2 md:mt-0'>
                <div className='flex flex-wrap gap-2'>
                  {INTERESTS.map(interest => (
                    <Badge
                      defaultState={employeeOnboard.interests.includes(interest.id)}
                      onClick={handleInterestClick}
                      text={interest.name}
                      value={interest.id}
                      key={interest.id}
                    />
                  ))}
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
        </form>
      </div>
    </>
  );
};

export default EmployeeSkills;
