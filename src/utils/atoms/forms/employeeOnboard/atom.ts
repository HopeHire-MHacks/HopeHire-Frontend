import { atom } from 'recoil';
import { CreateEmployeeData } from '@/api/Employee/EmployeeService';

export const employeeOnboardAtom = atom<CreateEmployeeData>({
  key: 'employeeOnboardAtom',
  default: {
    name: '',
    personalStatement: '',
    skills: [],
    interests: [],
    dateOfBirth: '2000-11-11',
    remarks: '',
    availableTimes: [],
    preferredLocation: [],
    dialysisFrequency: 0,
    profilePhoto: null,
    resume: null,
    country: '',
    city: '',
    state: '',
    postalCode: '',
    address: '',
    availableTimesCalendar: [],
    resumeName: '',
  },
});
