import React, { useEffect, useState } from 'react';
import Breadcrumbs, { employeeSteps, employerSteps, Step } from '@components/Onboard/Breadcrumbs';
import ChooseProfile, { Tier } from '@components/Onboard/ChooseProfile';
import EmployerInformation from '@components/Onboard/YourInformation/Employer';
import EmployeeInformation from '@components/Onboard/YourInformation/Employee/EmployeeInfomation';
import EmployeeSkills from '@components/Onboard/YourInformation/Employee/EmployeeSkills';
import Schedule from '@/components/Onboard/Schedule';

const Onboard = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [steps, setSteps] = useState<Step[]>(employerSteps);
  const [selectedProfile, setSelectedProfile] = useState<Tier>(Tier.EMPLOYER);
  useEffect(() => {
    setSteps(prev =>
      prev.map((s, i) => {
        return {
          ...s,
          status: i === currentStep ? 'current' : i < currentStep ? 'complete' : 'upcoming',
          onClick: i <= currentStep ? () => setCurrentStep(i) : () => '',
        };
      }),
    );
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onSelectProfile = (tier: Tier) => {
    setSelectedProfile(tier);
    setSteps(tier === Tier.EMPLOYER ? employerSteps : employeeSteps);
  };

  const SelectStep = (): JSX.Element => {
    if (currentStep >= steps.length) return <></>;

    if (selectedProfile === Tier.EMPLOYER) {
      switch (currentStep) {
        case 0:
          return <ChooseProfile onNext={nextStep} selected={selectedProfile} setSelected={onSelectProfile} />;
        case 1:
          return <EmployerInformation />;
        default:
          return <></>;
      }
    }
    if (selectedProfile === Tier.EMPLOYEE) {
      switch (currentStep) {
        case 0:
          return <ChooseProfile onNext={nextStep} selected={selectedProfile} setSelected={onSelectProfile} />;
        case 1:
          return <EmployeeInformation onNext={nextStep} />;
        case 2:
          return <EmployeeSkills onNext={nextStep} />;
        case 3:
          return <Schedule />;
        default:
          return <></>;
      }
    }
    return <></>;
  };

  return (
    <div className='isolate bg-white w-full flex justify-center py-0 md:py-20'>
      <div className='relative w-full max-w-7xl h-full'>
        <Breadcrumbs steps={steps} />
        <SelectStep />
      </div>
    </div>
  );
};

export default Onboard;
