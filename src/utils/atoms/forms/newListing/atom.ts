import { atom } from 'recoil';
import { EventData } from '@/components/Calendar';

interface newListingState {
  name: string;
  jobType: string;
  industryType: string;
  description: string;
  requirements: string;
  flexiblity: string;
  country: string;
  state: string;
  city: string;
  region: string;
  address: string;
  postalCode: string;
  dialysisSupport: boolean;
  changeSchedule: boolean;
  physicalDemands: string;
  minSalary: number | null;
  maxSalary: number | null;
  workScheduleCalendar: EventData[];
  workSchedule: string[];
  openImmediately: boolean;
  openDatePicker: string;
  openDate: string;
}

export const newListingAtom = atom<newListingState>({
  key: 'newListingAtom',
  default: {
    name: '',
    jobType: 'Full-time',
    industryType: 'Automobiles and Components',
    description: '',
    requirements: '',
    flexiblity: '',
    country: 'Singapore',
    state: '',
    city: '',
    region: '',
    address: '',
    postalCode: '',
    dialysisSupport: true,
    changeSchedule: true,
    physicalDemands: 'Light',
    minSalary: null,
    maxSalary: null,
    workScheduleCalendar: [],
    workSchedule: [],
    openImmediately: true,
    openDatePicker: '',
    openDate: '',
  },
});
