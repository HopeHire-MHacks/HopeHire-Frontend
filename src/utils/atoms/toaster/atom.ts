import { EventData } from '@/components/Calendar';
import { atom } from 'recoil';

export const enum ToasterType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

interface ToasterState {
  isShown: boolean;
  title: string;
  message: string;
  type: ToasterType;
}

export const toasterAtom = atom<ToasterState>({
  key: 'toasterAtom',
  default: {
    isShown: false,
    title: '',
    message: '',
    type: ToasterType.SUCCESS,
  },
});

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

interface employerProfileState {
  name: string;
  address: string;
  postalCode: string;
  numOfEmployees: string;
  about: string;
  phone: string;
  email: string;
  website: string;
}

export const employerProfileAtom = atom<employerProfileState>({
  key: 'employerProfileAtom',
  default: {
    name: '',
    address: '',
    postalCode: '',
    numOfEmployees: '',
    about: '',
    phone: '',
    email: '',
    website: '',
  },
});
