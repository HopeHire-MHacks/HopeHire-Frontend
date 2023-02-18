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
  address: string;
  dialysisSupport: boolean;
  changeSchedule: boolean;
  physicalDemands: string;
  minSalary: number | null;
  maxSalary: number | null;
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
    address: '',
    dialysisSupport: true,
    changeSchedule: true,
    physicalDemands: 'Light',
    minSalary: null,
    maxSalary: null,
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
