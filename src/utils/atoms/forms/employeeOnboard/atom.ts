import { atom } from 'recoil';
import { EventData } from '@/components/Calendar';

interface EmployeeFormState {
  name: string;
  personalStatement: string;
  skills: number[];
  interests: number[];
  isAvailable: boolean;
  dateOfBirth: Date;
  remarks: string;
  availableTimes: string[];
  preferredLocation: number[];
  dialysisFrequency: number;
  profilePhoto: string;
  resume: string;
  resumeName: string;
  postalCode: string;
  availableTimesCalendar: EventData[];
}

export const employeeOnboardAtom = atom<EmployeeFormState>({
  key: 'employeeOnboardAtom',
  default: {
    name: '',
    personalStatement: '',
    skills: [],
    interests: [],
    isAvailable: true,
    dateOfBirth: new Date(),
    remarks: '',
    availableTimes: [],
    preferredLocation: [0, 0],
    dialysisFrequency: 0,
    profilePhoto: '',
    resume: '',
    resumeName: 'NO_FILE_SELECTED',
    postalCode: '',
    availableTimesCalendar: [],
  },
});
