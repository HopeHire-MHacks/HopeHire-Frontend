import { atom } from 'recoil';
import { CreateJobData } from '@/api/Jobs/JobService';

export const defaultState: CreateJobData = {
  openingTime: '',
  positionName: '',
  jobType: 'Full Time',
  industryType: 0,
  jobDescription: '',
  jobRequirements: '',
  jobFlexibility: '',
  hasDialysisSupport: false,
  hasFlexibleSchedule: false,
  physicalDemands: '',
  salaryType: 'fixed',
  country: '',
  city: '',
  state: '',
  postalCode: '',
  address: '',
  skills: [],
  latLong: [],
  salaryRange: [],
  availableTimes: [],
  openImmediately: false,
  minSalary: null,
  maxSalary: null,
  workScheduleCalendar: [],
};

export const newListingAtom = atom<CreateJobData>({
  key: 'newListingAtom',
  default: {
    ...defaultState,
  },
});
